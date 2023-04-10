import { Box } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          boxSizing: "content-box",
        }}
      >
        <Sidebar />
        <GroupBody />
      </Box>
    </Wrapper>
  );
}
