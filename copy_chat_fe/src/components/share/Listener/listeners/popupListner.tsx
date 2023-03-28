import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { actions as ui } from "../../../../store/ui";
import { Store } from "../../../../types/store";

export default function PopupListner() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const popupNotice = useSelector((s: Store.AppState) =>
    s.ui.popupNotifications.at(-1)
  );

  if (popupNotice) {
    enqueueSnackbar(`${popupNotice.content}.`, {
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      variant: popupNotice.variant,
      autoHideDuration: 3000,
    });
    dispatch(ui.removePopNotice());
  }

  return <div className="popupListner"></div>;
}
