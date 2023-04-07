import { Textsms } from "@mui/icons-material";
import { AppBar, Container, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";

export default function ChannelBar() {
  const activeChannel = useSelector((s: RootState) => s.ui.activeChannel);

  return (
    <AppBar position="relative">
      <Toolbar>
        {activeChannel?.type === "TXT" && <Textsms />}
        {activeChannel?.name}
      </Toolbar>
    </AppBar>
  );
}
