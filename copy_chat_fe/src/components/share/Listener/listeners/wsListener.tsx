import { useEffect } from "react";
import socket from "../../../../utils/socket";

import { useDispatch, useSelector } from "react-redux";
import { meta_actions } from "../../../../store/meta";
import { RootState } from "../../../../store/configStore";
import { getAccessToken } from "../../../../utils/token";
import { group_actions } from "../../../../store/groups";

import { createDataChannel, createLocalStream } from "../../../../utils/webrtc";
import { webrtc_actions } from "../../../../store/webrtc";
import {
  sendAnswer,
  sendCandidate,
  sendOffer,
} from "../../../../store/ws_call/webrtc";

export default function WsListener() {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const logined = useSelector((s: RootState) => s.auth.logined);
  const peers = useSelector((s: RootState) => s.webrtc.peers);

  const wslistenerAttached = useSelector(
    (s: RootState) => s.meta.wslistenerAttached
  );

  useEffect(() => {
    if (!logined) {
      return;
    }
    if (wslistenerAttached) return;

    // after connect, send authorize request
    socket.on("connect", async () => {
      socket.emit("meta.auth.init", { token: await getAccessToken() });
    });

    // enlist listing list
    socket.on("meta.auth.success", async () => {
      socket.emit("meta.auth.enlist");
    });

    socket.on("message.new", async (data) => {
      dispatch(group_actions.add_message(data));
    });

    socket.on("message", (data) => {
      console.log(data);
    });

    socket.on("rtc.join", async (data) => {
      console.log("rtc.join", data);
      const loc = await createLocalStream();
      if (loc) {
        const dtc = createDataChannel(data.sender_id, loc);
        console.log(loc);

        dtc.peerConnection.addEventListener(
          "iceconnectionstatechange",
          (ev) => {
            let iceConnectionState = dtc.peerConnection.iceConnectionState;
            if (
              iceConnectionState === "failed" ||
              iceConnectionState === "disconnected" ||
              iceConnectionState === "closed"
            ) {
              console.log("iceConnectionState change:", iceConnectionState);
              console.log("removing peer connection:", data.sender_id);
              dispatch(webrtc_actions.removeRemoteStream(data.sender_id));
              if (iceConnectionState !== "closed") {
                dtc.peerConnection.close();
              }
            }
          }
        );

        dtc.peerConnection.addEventListener("icecandidate", (ev) => {
          console.log("icecandidate event:", ev);
          if (ev.candidate) {
            console.log("New icecandidate :", JSON.stringify(ev.candidate));
            sendCandidate(
              { target_id: data.sender_id, candidate: ev.candidate },
              dispatch
            );
            return;
          } else {
            // ice candidate gather completed
            sendOffer(
              {
                target_id: data.sender_id,
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
            console.log("sdp offer created for", data.sender_id);
          });
      }
    });

    socket.on("rtc.sdp.offer", async (data) => {
      console.log(data);
      // offer received
      const desc = new RTCSessionDescription(data.detail);
      const loc = await createLocalStream();
      if (loc) {
        const dtc = createDataChannel(data.sender_id, loc);
        const peer = {
          id: data.sender_id,
          dataChannel: dtc.dataChannel,
          peerConnection: dtc.peerConnection,
        };
        dispatch(webrtc_actions.addRemoteStream(peer));
        dtc.peerConnection.addEventListener(
          "iceconnectionstatechange",
          (ev) => {
            let iceConnectionState = dtc.peerConnection.iceConnectionState;
            if (
              iceConnectionState === "failed" ||
              iceConnectionState === "disconnected" ||
              iceConnectionState === "closed"
            ) {
              console.log("iceConnectionState change:", iceConnectionState);
              console.log("removing peer connection:", data.sender_id);
              dispatch(webrtc_actions.removeRemoteStream(data.sender_id));
              if (iceConnectionState !== "closed") {
                dtc.peerConnection.close();
              }
            }
          }
        );

        dtc.peerConnection.addEventListener("icecandidate", (ev) => {
          console.log("icecandidate event:", ev);
          if (ev.candidate) {
            console.log("New icecandidate :", JSON.stringify(ev.candidate));
            sendCandidate(
              { target_id: peer.id, candidate: ev.candidate },
              dispatch
            );
            return;
          } else {
            // ice candidate gather completed
            sendAnswer(
              {
                target_id: peer.id,
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
            console.log("Remote description setted for id:", peer.id);
          })
          .then(() => {
            return dtc.peerConnection.createAnswer();
          })
          .then((answer) => {
            console.log("Answer Created", answer);
            dtc.peerConnection.setLocalDescription(answer);
          });
      }
    });

    socket.on("rtc.sdp.answer", (data) => {
      console.log("received sdp answer", data);
      console.log("current peers", peers);
      // answer received
      const target_dtc = peers.find((e) => e.id === data.sender_id);
      target_dtc?.peerConnection?.setRemoteDescription(data.detail);
    });
    socket.on("rtc.sdp.ice.candidate", async (data) => {
      const newCandidate = new RTCIceCandidate(data.candidate);
      const target_dtc = peers.find((e) => e.id === data.sender_id);
      if (target_dtc && target_dtc?.peerConnection) {
        console.log("adding candidaate", newCandidate);
        await target_dtc.peerConnection
          .addIceCandidate(newCandidate)
          .catch((err) => console.log(err));
      }
    });
    socket.on("rtc.sdp.exit", () => {
      "manange exit";
    });

    socket.onAny((ev, data) => {
      console.log("ev:", ev, "data:", data);
      console.log(socket);
    });

    socket.connect();
    dispatch(meta_actions.AttachWsListener());
  });
  return null;
}
