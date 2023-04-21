import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { Webrtc } from "../types/webrtc.types";

import { sendRtcPacket } from "../store/ws_call/webrtc";

export function addLocalTracks(pc: RTCPeerConnection, st: MediaStream) {
  st.getTracks().forEach((track) => {
    pc.addTrack(track, st);
  });
}

export function addRemoteTracks(
  pc: RTCPeerConnection,
  srcObject: MediaProvider
) {
  pc.ontrack = ({ track, streams }) => {
    track.onunmute = () => {
      if (srcObject) {
        return;
      }
      srcObject = streams[0];
    };
  };
}

export async function negotiator(
  flags: Webrtc.ConnectionFlags,
  pc: RTCPeerConnection,
  signaler: Function,
  onerror: Function,
  onany: Function
) {
  // semaphore for check is currently creating offer or not
  flags.isMakingOffer = true;
  await pc
    .setLocalDescription()
    .then(() => {
      signaler(pc.localDescription);
    })
    .catch((e) => onerror(e))
    .finally(() => {
      flags.isMakingOffer = false;
      onany();
    });
}

export function attachIceHandler(pc: RTCPeerConnection, signaler: Function) {
  pc.oniceconnectionstatechange = (ev) => {
    if (
      pc.iceConnectionState === "disconnected" ||
      pc.iceConnectionState === "closed"
    ) {
      console.log("iceConnectionState change:", pc.iceConnectionState);
      if (pc.iceConnectionState !== "closed") {
        pc.close();
      }
    } else if (pc.iceConnectionState === "failed") {
      pc.restartIce();
    }
  };

  pc.onicecandidate = (ev) => {
    console.log("icecandidate event:", ev);
    if (ev.candidate) {
      console.log("New icecandidate :", JSON.stringify(ev.candidate));
      signaler(ev.candidate);
      return;
    }
  };

  pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState === "failed") {
      pc.restartIce();
    }
  };
}

export async function createReceiver(
  flags: Webrtc.ConnectionFlags,
  pc: RTCPeerConnection,
  signaler: Function,
  onerror: Function
) {
  return async ({ description, candidate }: Webrtc.RTCPacketString) => {
    try {
      if (description) {
        console.log(description);
        const __description = new RTCSessionDescription(
          JSON.parse(description)
        );
        console.log(__description);
        const isCollided =
          __description.type === "offer" &&
          (flags.isMakingOffer || pc.signalingState !== "stable");

        flags.ignoreOffer = flags.privileged && isCollided;
        if (flags.ignoreOffer) {
          return;
        }
        await pc.setRemoteDescription(__description);
        if (__description.type === "offer") {
          await pc.setLocalDescription();
          signaler(pc.localDescription);
        }
      } else if (candidate) {
        console.log(candidate);
        const __candidate = new RTCIceCandidate(JSON.parse(candidate));
        console.log(__candidate);
        try {
          await pc.addIceCandidate(__candidate);
        } catch (err) {
          if (!flags.ignoreOffer) {
            throw err;
          }
        }
      }
    } catch (err) {
      onerror(err);
    }
  };
}

export function createPeerConnection(st: MediaStream) {
  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: `${process.env.REACT_APP_TURN_URL}`,
        username: `${process.env.REACT_APP_TURN_USER}`,
        credential: `${process.env.REACT_APP_TURN_PWD}`,
      },
    ],
  });
  addLocalTracks(pc, st);
  return pc;
}

export function createConnections(
  target_id: number,
  local_stream: MediaStream
) {
  const pc = createPeerConnection(local_stream);
  const dtc = pc.createDataChannel("dtc:" + target_id);
  const remoteStream = new MediaStream();
  pc.ontrack = async (ev: RTCTrackEvent) => {
    console.log("attaching track to remoteStream, target id:", target_id);
    console.log("detail:", ev);
    remoteStream.addTrack(ev.track);
  };

  return { peerConnection: pc, dataChannel: dtc, stream: remoteStream };
}

export function createConnectionModel(
  dispatch: Dispatch<AnyAction>,
  uid: number,
  localstream: MediaStream
) {
  return async (target_id: number, target_sid: string) => {
    const { peerConnection, dataChannel, stream } = createConnections(
      target_id,
      localstream
    );

    const new_connection: Webrtc.ConnectionModel = {
      id: target_id,
      flags: {
        isMakingOffer: false,
        privileged: uid > target_id,
        ignoreOffer: false,
      },
      peerconnection: peerConnection,
      datachannel: dataChannel,
      remotestream: stream,
    };

    new_connection.peerconnection.onnegotiationneeded = () => {
      negotiator(
        new_connection.flags,
        new_connection.peerconnection,
        (desc: RTCSessionDescription) => {
          sendRtcPacket(
            {
              target_id: target_id,
              target_sid: target_sid,
              packet: { id: uid, description: JSON.stringify(desc) },
            },
            dispatch
          );
        },
        (err: any) => {
          console.log(err);
        },
        () => {}
      );
    };

    attachIceHandler(
      new_connection.peerconnection,
      (candidate: RTCIceCandidate) => {
        sendRtcPacket(
          {
            target_id: target_id,
            target_sid: target_sid,
            packet: { id: uid, candidate: JSON.stringify(candidate) },
          },
          dispatch
        );
      }
    );

    const receiver = await createReceiver(
      new_connection.flags,
      new_connection.peerconnection,
      (desc: RTCSessionDescription) => {
        sendRtcPacket(
          {
            target_id: target_id,
            target_sid: target_sid,
            packet: { id: uid, description: JSON.stringify(desc) },
          },
          dispatch
        );
      },
      (err: any) => {
        console.log(err);
      }
    );

    const __new_connection = {
      ...new_connection,
      handler: receiver,
    };
    return __new_connection;
  };
}
