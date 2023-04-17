import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore";
import { webrtc_actions } from "../../../../store/webrtc";
import {
  sendAnswer,
  sendCandidate,
  sendJoin,
  sendOffer,
} from "../../../../store/ws_call/webrtc";
import { createDataChannel } from "../../../../utils/webrtc";

export default function CallChannelContext() {
  let localstream: MediaStream | null;
  const dispatch = useDispatch();
  const activeChannel = useSelector((s: RootState) => s.ui.activeChannel);
  const joiners = useSelector((s: RootState) => s.webrtc.joiners);
  const offerers = useSelector((s: RootState) => s.webrtc.offerers);
  const answers = useSelector((s: RootState) => s.webrtc.answers);

  interface Connection {
    id: number;
    datachannel: RTCDataChannel;
    peerconnection: RTCPeerConnection;
  }

  const [connections, setConnections] = useState<Connection[]>([]);

  async function createLocalStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localstream = new MediaStream(stream);
      const vidTrack = stream.getVideoTracks();
      const audTrack = stream.getAudioTracks();
      vidTrack[0].enabled = false;
      audTrack[0].enabled = false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const createOffer = async (target_id: number) => {
    if (!localstream) return;
    const dtc = createDataChannel(target_id, localstream);
    setConnections([
      ...connections,
      {
        id: target_id,
        datachannel: dtc.dataChannel,
        peerconnection: dtc.peerConnection,
      },
    ]);
    dtc.peerConnection.addEventListener("iceconnectionstatechange", (ev) => {
      let iceConnectionState = dtc.peerConnection.iceConnectionState;
      if (
        iceConnectionState === "failed" ||
        iceConnectionState === "disconnected" ||
        iceConnectionState === "closed"
      ) {
        console.log("iceConnectionState change:", iceConnectionState);
        console.log("removing peer connection:", target_id);
        setConnections(connections.filter((p) => p.id !== target_id));
        if (iceConnectionState !== "closed") {
          dtc.peerConnection.close();
        }
      }
    });

    dtc.peerConnection.addEventListener("icecandidate", (ev) => {
      console.log("icecandidate event:", ev);
      if (ev.candidate) {
        console.log("New icecandidate :", JSON.stringify(ev.candidate));
        sendCandidate(
          { target_id: target_id, candidate: ev.candidate },
          dispatch
        );
        return;
      } else {
        // ice candidate gather completed
        sendOffer(
          {
            target_id: target_id,
            detail: dtc.peerConnection.localDescription,
          },
          dispatch
        );
      }
    });
    dtc.peerConnection
      .createOffer()
      .then((offer) => dtc.peerConnection.setLocalDescription(offer))
      .then(() => {
        console.log("sdp offer created for", target_id);
      });
  };

  const createAnswer = (
    target_id: number,
    detail: RTCSessionDescription,
    local_stream: MediaStream
  ) => {
    const desc = new RTCSessionDescription(detail);
    const dtc = createDataChannel(target_id, local_stream);
    setConnections([
      ...connections,
      {
        id: target_id,
        datachannel: dtc.dataChannel,
        peerconnection: dtc.peerConnection,
      },
    ]);
    dtc.peerConnection.addEventListener("iceconnectionstatechange", (ev) => {
      let iceConnectionState = dtc.peerConnection.iceConnectionState;
      if (
        iceConnectionState === "failed" ||
        iceConnectionState === "disconnected" ||
        iceConnectionState === "closed"
      ) {
        console.log("iceConnectionState change:", iceConnectionState);
        console.log("removing peer connection:", target_id);
        if (iceConnectionState !== "closed") {
          dtc.peerConnection.close();
        }
      }
    });

    dtc.peerConnection.addEventListener("icecandidate", (ev) => {
      console.log("icecandidate event:", ev);
      if (ev.candidate) {
        console.log("New icecandidate :", JSON.stringify(ev.candidate));
        sendCandidate(
          { target_id: target_id, candidate: ev.candidate },
          dispatch
        );
        return;
      } else {
        // ice candidate gather completed
        sendAnswer(
          {
            target_id: target_id,
            detail: dtc.peerConnection.localDescription,
          },
          dispatch
        );
      }
    });
    //setting remote description with offer
    dtc.peerConnection
      .setRemoteDescription(desc)
      .then(() => {
        console.log("Remote description setted for id:", target_id);
      })
      .then(() => {
        return dtc.peerConnection.createAnswer();
      })
      .then((answer) => {
        console.log("Answer Created", answer);
        dtc.peerConnection.setLocalDescription(answer);
      });
  };

  const acceptAnswer = (target_id: number, detail: RTCSessionDescription) => {
    const target_dtc = connections.find((e) => e.id === target_id);
    if (target_dtc) {
      console.log("adding remote description for target_id", target_id);
      target_dtc.peerconnection.setRemoteDescription(detail);
    } else {
      console.log("cannot find connection with target_id", target_id);
    }
  };

  const manageCandidate = (target_id: number, detail: RTCIceCandidate) => {
    const newCandidate = new RTCIceCandidate(detail);
    const target_dtc = connections.find((e) => e.id === target_id);
    if (target_dtc) {
      console.log("adding candidaate", newCandidate);
      target_dtc.peerconnection
        .addIceCandidate(newCandidate)
        .catch((err) => console.log(err));
    } else {
      console.log("cannot find connection with target_id", target_id);
    }
  };

  const attachLocalStream = async () => {
    if (!localstream) {
      await createLocalStream();
    }

    if (localstream) {
      console.log("attach localstream", localstream);
      if (activeChannel) {
        sendJoin(
          { gid: activeChannel?.group_id, cid: activeChannel?.id },
          dispatch
        );
      }
    }
  };

  const vidToggle = async () => {
    if (localstream) {
      const vids = localstream.getVideoTracks();
      vids[0].enabled = !vids[0].enabled;
    }
  };
  const audToggle = async () => {
    if (localstream) {
      const auds = localstream.getAudioTracks();
      auds[0].enabled = !auds[0].enabled;
    }
  };

  const SelfVid = () => {
    if (!localstream) {
      return null;
    } else {
      return (
        <div>
          <p>self</p>
          <video
            autoPlay
            ref={(ref) => {
              if (ref) {
                ref.srcObject = localstream;
              }
            }}
          />
        </div>
      );
    }
  };
  const RemoteVideos = () => {
    const vids = connections.map((peer) => {
      const remoteStream = new MediaStream();
      peer.peerconnection.addEventListener(
        "track",
        async (ev: RTCTrackEvent) => {
          console.log("attaching track:", peer.id);
          console.log("detail:", ev.track);
          remoteStream.addTrack(ev.track);
        }
      );
      return (
        <li key={peer.id}>
          <p>{peer.id}</p>
          <video
            autoPlay
            key={peer.id}
            ref={(ref) => {
              if (ref) {
                ref.srcObject = remoteStream;
              }
            }}
          />
        </li>
      );
    });
    return <>{vids}</>;
  };

  useEffect(() => {
    if (joiners?.length >= 1) {
      const joiner = joiners[0];
      if (joiner) {
        createOffer(joiner.id);
        dispatch(webrtc_actions.deleteJoiner(joiner.id));
      }
    }
  });
  useEffect(() => {
    if (offerers?.length >= 1) {
      const offerer = offerers[0];
      if (offerer && offerer?.sdp && localstream) {
        createAnswer(offerer.id, offerer.sdp, localstream);
        dispatch(webrtc_actions.deleteOfferer(offerer.id));
      }
    }
  });
  useEffect(() => {
    if (answers?.length >= 1) {
      const answer = answers[0];
      if (answer && answer?.sdp) {
        acceptAnswer(answer.id, answer.sdp);
        dispatch(webrtc_actions.deleteAnswerer(answer.id));
      }
    }
  });

  return (
    <>
      <Button onClick={attachLocalStream}>attach</Button>
      <Button onClick={vidToggle}>vid</Button>
      <Button onClick={audToggle}>aud</Button>
      <SelfVid />
      <RemoteVideos />
    </>
  );
}
