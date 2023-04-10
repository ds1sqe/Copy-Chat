import { Textsms } from "@mui/icons-material";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configStore";

export default function ChannelBar() {
  const activeChannel = useSelector((s: RootState) => s.ui.activeChannel);

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
      <Typography variant="h5">
        {activeChannel?.type === "TXT" && <Textsms />}
        {activeChannel?.name}
      </Typography>
    </Box>
  );
}
