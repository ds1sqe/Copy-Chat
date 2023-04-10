import { Box } from "@mui/system";
import ChannelBar from "./Channel/ChannelBar";
import MemberList from "./Member/MemberList";

export default function GroupBody() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "2px dashed gray",
        width: "100%",
      }}
    >
      <ChannelBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          border: "2px dashed gray",
          height: "100%",
        }}
      >
        <MemberList />
      </Box>
    </Box>
  );
}
