import { People, Textsms, TocOutlined } from "@mui/icons-material";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";
import { ui_actions } from "../../../store/ui";

export default function ChannelBar() {
  const activeChannel = useSelector((s: RootState) => s.ui.active.channel);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: 48,
        border: "1px solid gray",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Button
        onClick={() => {
          dispatch(ui_actions.toggleSidebar());
        }}
      >
        <TocOutlined />
      </Button>

      {activeChannel?.type === "TXT" && <Textsms />}
      <Typography variant="h5">{activeChannel?.name}</Typography>

      <Button
        sx={{ marginLeft: "auto" }}
        onClick={() => {
          dispatch(ui_actions.toggleMemberList());
        }}
      >
        <People />
      </Button>
    </Box>
  );
}
