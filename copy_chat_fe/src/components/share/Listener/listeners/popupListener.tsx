import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { off, on } from "../../../../utils/events";

import { Ui } from "../../../../types/ui.types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../../types/store";
import { meta_actions } from "../../../../store/meta";

export default function PopupListener() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const popuplistenerAttached = useSelector(
    (s: Store.AppState) => s.meta.popuplistenerAttached
  );

  interface PopupNoticeEvent extends CustomEvent {
    type: string;
    detail: Ui.PopUpNotification;
  }
  interface PopupListenerType extends EventListener {
    (evt: PopupNoticeEvent): void;
  }

  function popupNoticeListener(event: PopupNoticeEvent) {
    console.log(event);
    const data = event.detail;
    enqueueSnackbar(`${data.content}.`, {
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      variant: data.variant,
      autoHideDuration: 3000,
    });
  }

  useEffect(() => {
    if (popuplistenerAttached) return;

    on("PopupNotice", popupNoticeListener as PopupListenerType);

    dispatch(meta_actions.AttachPopUpListener());
    // return () => {
    //   off("PopupNotice", popupNoticeListener as PopupListenerType);
    //   dispatch(meta.DetachPopUpListener());
    // };
  });
  return null;
}
