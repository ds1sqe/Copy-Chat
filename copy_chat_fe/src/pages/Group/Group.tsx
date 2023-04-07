import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import GroupBody from "../../components/Group/GroupBody";

import Sidebar from "../../components/share/SideBar/SideBar";
import Wrapper from "../../components/share/Wrapper";
import { findGroup } from "../../store/selectors/group";

import { ui_actions } from "../../store/ui";

export default function Group() {
  const { groupId, channelId } = useParams();

  const dispatch = useDispatch();

  const group = useSelector(findGroup(Number(groupId)));

  const activeChannel = group?.channels.find(
    (ch) => ch.id === Number(channelId)
  );

  useEffect(() => {
    dispatch(ui_actions.pageSwitched({ Group: group }));
    if (activeChannel) {
      dispatch(ui_actions.focusChannel(activeChannel));
    }
  });

  if (!group) {
    return (
      <Wrapper>
        <Navigate to={`/@me/`} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <GroupBody />
        </Grid>
      </Grid>
    </Wrapper>
  );
}
