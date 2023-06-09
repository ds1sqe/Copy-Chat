import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../types/store";

import { useEffect } from "react";

import { meta_actions } from "../../../store/meta";
import { getGroup } from "../../../store/be_call/groups";
import { getInvitation } from "../../../store/be_call/invitations";

const FetchData: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const fetchNeeded = useSelector((s: Store.AppState) => s.meta.fetchNeeded);

  useEffect(() => {
    if (!fetchNeeded) return;
    dispatch(meta_actions.FetchingStart());

    // return () => {
    //   dispatch(meta.DetachListener());
    // };
    getGroup(dispatch);
    getInvitation(dispatch);

    dispatch(meta_actions.FetchNotNeeded());
    dispatch(meta_actions.FetchingEnd());
  });

  return null;
};

export default FetchData;
