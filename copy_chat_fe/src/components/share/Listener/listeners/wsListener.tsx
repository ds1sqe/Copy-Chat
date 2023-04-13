import { useEffect } from "react";
import socket from "../../../../utils/socket";

import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../../types/store";
import { meta_actions } from "../../../../store/meta";

export default function WsListener() {
  const dispatch = useDispatch();
  const wslistenerAttached = useSelector(
    (s: Store.AppState) => s.meta.wslistenerAttached
  );

  useEffect(() => {
    if (wslistenerAttached) return;

    dispatch(meta_actions.AttachWsListener());
    // return () => {
    //   off("PopupNotice", popupNoticeListener as PopupListenerType);
    //   dispatch(meta.DetachPopUpListener());
    // };
  });
  return null;
}
