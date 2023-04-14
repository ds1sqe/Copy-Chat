import { useEffect } from "react";
import socket from "../../../../utils/socket";

import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../../types/store";
import { meta_actions } from "../../../../store/meta";
import { RootState } from "../../../../store/configStore";
import { getAccessToken } from "../../../../utils/token";

export default function WsListener() {
  const dispatch = useDispatch();
  const logined = useSelector((s: RootState) => s.auth.logined);
  const wslistenerAttached = useSelector(
    (s: RootState) => s.meta.wslistenerAttached
  );

  useEffect(() => {
    if (!logined) {
      return;
    }
    if (wslistenerAttached) return;

    socket.on("connect", async () => {
      socket.emit("meta.auth.init", { token: await getAccessToken() });
    });
    socket.on("meta.auth.success", async () => {
      socket.emit("meta.auth.enlist");
    });

    socket.on("message", (data) => {
      console.log(data);
    });
    socket.onAny((ev, data) => {
      console.log(ev, data);
    });

    socket.connect();
    dispatch(meta_actions.AttachWsListener());
  });
  return null;
}
