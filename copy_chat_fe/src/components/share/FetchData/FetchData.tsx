import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../types/store";

import { useEffect } from "react";

import { actions as meta } from "../../../store/meta";
import { getGroup } from "../../../store/sideEffects/groups";

const FetchData: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const fetchNeeded = useSelector((s: Store.AppState) => s.meta.fetchNeeded);

  useEffect(() => {
    if (!fetchNeeded) return;
    dispatch(meta.FetchingStart());

    // return () => {
    //   dispatch(meta.DetachListener());
    // };
    getGroup(dispatch);

    dispatch(meta.FetchNotNeeded());
    dispatch(meta.FetchingEnd());
  });

  return null;
};

export default FetchData;
