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
      socket.emit("meta.auth", { token: await getAccessToken() });
    });

    socket.connect();

    dispatch(meta_actions.AttachWsListener());
    // return () => {
    //   off("PopupNotice", popupNoticeListener as PopupListenerType);
    //   dispatch(meta.DetachPopUpListener());
    // };
  });
  return null;
}
