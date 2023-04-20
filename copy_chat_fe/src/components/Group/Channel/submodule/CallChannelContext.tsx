import { Box, Button } from "@mui/material";
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
import { createConnections } from "../../../../utils/webrtc";

export default function CallChannelContext() {
  const [localstream, setLocalstream] = useState<MediaStream | null>(null);
  const dispatch = useDispatch();
  const activeChannel = useSelector((s: RootState) => s.ui.activeChannel);
  const joiners = useSelector((s: RootState) => s.webrtc.joiners);
  const offerers = useSelector((s: RootState) => s.webrtc.offerers);
  const answers = useSelector((s: RootState) => s.webrtc.answers);
  const candidates = useSelector((s: RootState) => s.webrtc.icecandidates);

  interface Connection {
    id: number;
    //connected?: boolean;
    datachannel: RTCDataChannel;
    peerconnection: RTCPeerConnection;
    stream: MediaStream;
  }

  //const [connections, setConnections] = useState<Connection[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  async function createLocalStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const __localstream = new MediaStream(stream);
      setLocalstream(__localstream);
      const vidTrack = stream.getVideoTracks();
      const audTrack = stream.getAudioTracks();
      vidTrack[0].enabled = true;
      audTrack[0].enabled = true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const createOffer = async (target_id: number) => {
    if (!localstream) return;
    const dtc = createConnections(target_id, localstream);

    dtc.peerConnection.onnegotiationneeded = () => {
      dtc.peerConnection
        .createOffer()
        .then((offer) => dtc.peerConnection.setLocalDescription(offer))
        .then(() => {
          console.log("sdp offer created for", target_id);
        })
        .then(() => {
          sendOffer(
            {
              target_id: target_id,
              detail: dtc.peerConnection.localDescription,
            },
            dispatch
          );
        });
    };
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
          { target_id: target_id, candidate: JSON.stringify(ev.candidate) },
          dispatch
        );
        return;
      } else {
        // ice candidate gather completed
      }
    });

    setConnections([
      ...connections.filter((p) => p.id !== target_id),
      {
        id: target_id,
        datachannel: dtc.dataChannel,
        peerconnection: dtc.peerConnection,
        stream: dtc.stream,
      },
    ]);
  };

  const createAnswer = (target_id: number, detail: RTCSessionDescription) => {
    if (!localstream) return;
    const desc = new RTCSessionDescription(detail);
    const dtc = createConnections(target_id, localstream);
    //setting remote description with offer
    dtc.peerConnection
      .setRemoteDescription(desc)
      .then(() => {
        console.log("Remote description setted for id:", target_id);
      })
      .then(() => dtc.peerConnection.createAnswer())
      .then((answer) => {
        console.log("Answer Created", answer);
        return dtc.peerConnection.setLocalDescription(answer);
      })
      .then(() => {
        console.log("localDescription:", dtc.peerConnection.localDescription);
        sendAnswer(
          {
            target_id: target_id,
            detail: dtc.peerConnection.localDescription,
          },
          dispatch
        );
      });

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
          { target_id: target_id, candidate: JSON.stringify(ev.candidate) },
          dispatch
        );
        return;
      } else {
        // ice candidate gather completed
        console.log("candidate gathered for target id:", target_id);
      }
    });

    setConnections([
      ...connections.filter((p) => p.id !== target_id),
      {
        id: target_id,
        datachannel: dtc.dataChannel,
        peerconnection: dtc.peerConnection,
        stream: dtc.stream,
      },
    ]);
  };

  const acceptAnswer = (target_id: number, detail: RTCSessionDescription) => {
    const target_dtc = connections.find((e) => e.id === target_id);
    if (target_dtc) {
      console.log("adding remote description for target_id", target_id);
      target_dtc.peerconnection.setRemoteDescription(detail);
      setConnections([
        ...connections.filter((p) => p.id !== target_id),
        target_dtc,
      ]);
    } else {
      console.log("cannot find connection with target_id", target_id);
    }
  };

  const manageCandidate = (target_id: number, detail: string) => {
    const newCandidate = new RTCIceCandidate(JSON.parse(detail));
    const target_connection = connections.find((e) => e.id === target_id);
    if (target_connection) {
      console.log("adding candidate", newCandidate);
      target_connection.peerconnection
        .addIceCandidate(newCandidate)
        .catch((err) => console.log(err));
    } else {
      console.log("cannot find connection with target_id", target_id);
    }
  };

  const attachLocalStream = async () => {
    if (!localstream) {
      await createLocalStream();
      console.log("attach localstream", localstream);
    }
  };

  const joinReq = async () => {
    if (localstream) {
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
        <Box>
          <video
            style={{ height: "400px", width: "200px" }}
            autoPlay
            ref={(ref) => {
              if (ref) {
                ref.srcObject = localstream;
              }
            }}
          />
          <p>self</p>
        </Box>
      );
    }
  };
  const RemoteVideos = () => {
    const vids = connections.map((peer) => {
      return (
        <Box key={peer.id}>
          <video
            style={{ height: "600px", width: "300px" }}
            autoPlay
            key={peer.id}
            id={"remote_video." + peer.id}
            ref={(ref) => {
              if (ref) {
                ref.srcObject = peer.stream;
              }
            }}
          />
          <p>id:{peer.id}</p>
        </Box>
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
  }, [joiners]);
  useEffect(() => {
    if (offerers?.length >= 1) {
      const offerer = offerers[0];
      if (offerer && offerer?.sdp) {
        createAnswer(offerer.id, offerer.sdp);
        dispatch(webrtc_actions.deleteOfferer(offerer.id));
      }
    }
  }, [offerers]);
  useEffect(() => {
    if (answers?.length >= 1) {
      const answer = answers[0];
      if (answer && answer?.sdp) {
        acceptAnswer(answer.id, answer.sdp);
        dispatch(webrtc_actions.deleteAnswerer(answer.id));
      }
    }
  }, [answers]);
  useEffect(() => {
    if (candidates?.length >= 1) {
      const candidate = candidates[0];
      if (candidate && candidate?.candidate) {
        manageCandidate(candidate.id, candidate.candidate);
        dispatch(webrtc_actions.shiftCandidate());
      }
    }
  }, [candidates]);

  return (
    <>
      <Box>
        <Button onClick={attachLocalStream}>attach</Button>
        <Button onClick={joinReq}>join</Button>
        <Button onClick={vidToggle}>vid</Button>
        <Button onClick={audToggle}>aud</Button>
        <Button onClick={() => console.log(connections)}>debug</Button>
        <SelfVid />
      </Box>
      <RemoteVideos />
    </>
  );
}
