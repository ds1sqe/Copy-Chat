import { useEffect } from "react";
import socket from "../../../../utils/socket";

import { useDispatch, useSelector } from "react-redux";
import { meta_actions } from "../../../../store/meta";
import { RootState } from "../../../../store/configStore";
import { getAccessToken } from "../../../../utils/token";
import { group_actions } from "../../../../store/groups";

import { webrtc_actions } from "../../../../store/webrtc";

export default function WsListener() {
  const dispatch = useDispatch();
  const logined = useSelector((s: RootState) => s.auth.logined);
  const uid = useSelector((s: RootState) => s.auth.user?.id);

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
      console.log("received rtc.join request", data);
      dispatch(webrtc_actions.newJoiner({ id: data.sender_id }));
    });

    socket.on("rtc.sdp.offer", async (data) => {
      if (data?.target_id === uid) {
        console.log("received rtc.sdp.offer request", data);
        dispatch(
          webrtc_actions.newOfferer({ id: data.sender_id, sdp: data.detail })
        );
      }
    });

    socket.on("rtc.sdp.answer", (data) => {
      if (data?.target_id === uid) {
        console.log("received rtc.sdp.answer", data);
        dispatch(
          webrtc_actions.newAnswerer({ id: data.sender_id, sdp: data.detail })
        );
      }
    });

    socket.on("rtc.sdp.ice.candidate", async (data) => {
      if (data?.target_id === uid) {
        console.log("received rtc.sdp.ice.candidate", data);
        dispatch(
          webrtc_actions.newCandidate({
            id: data.sender_id,
            candidate: data.candidate,
          })
        );
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
