import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import GroupBody from "../../components/Group/GroupBody";

import Sidebar from "../../components/share/SideBar/SideBar";
import Wrapper from "../../components/share/Wrapper";
import { findGroup } from "../../store/selectors/group";

import { ui_actions } from "../../store/ui";
import { EnterRoom } from "../../store/ws_call/meta";
import { sendJoin } from "../../store/ws_call/webrtc";

export default function Group() {
  const { groupId, channelId } = useParams();

  const dispatch = useDispatch();

  const activeGroup = useSelector(findGroup(Number(groupId)));

  const activeChannel = activeGroup?.channels.find(
    (ch) => ch.id === Number(channelId)
  );

  useEffect(() => {
    if (activeGroup) {
      dispatch(ui_actions.pageSwitched({ Group: activeGroup }));
      if (activeChannel) {
        dispatch(ui_actions.focusChannel(activeChannel));
        EnterRoom({ gid: activeGroup.id, cid: activeChannel.id }, dispatch);
      } else {
        dispatch(ui_actions.deleteFocusChannel());
      }
    }
  });

  if (!activeGroup) {
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
