import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../types/store";

import { useEffect } from "react";

import { actions as meta } from "../../../store/meta";
import PopupListener from "./listeners/popupListener";

const Listener: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const listenerAttached = useSelector(
    (s: Store.AppState) => s.meta.listenerAttached
  );

  useEffect(() => {
    if (listenerAttached) return;
    dispatch(meta.AttachListener());
    // return () => {
    //   dispatch(meta.DetachListener());
    // };
  });

  return (
    <>
      <PopupListener />
    </>
  );
};

export default Listener;
