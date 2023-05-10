import { Textsms } from "@mui/icons-material";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";
import { ui_actions } from "../../../store/ui";

export default function ChannelBar() {
  const activeChannel = useSelector((s: RootState) => s.ui.active.channel);

  return (
    <Box
      sx={{
        height: 48,
        border: "1px solid gray",
        width: "100%",
        display: "inline-block",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Button
        onClick={() => {
          ui_actions.toggleSidebar();
        }}
      >
        sidebar
      </Button>
      <Typography variant="h5">
        {activeChannel?.type === "TXT" && <Textsms />}
        {activeChannel?.name}
      </Typography>
      <Button
        onClick={() => {
          ui_actions.toggleMemberList();
        }}
      >
        memberlist
      </Button>
    </Box>
  );
}
