import { Box } from "@mui/system";
import ChannelBar from "./Channel/ChannelBar";
import MemberList from "./Member/MemberList";

export default function GroupBody() {
  return (
    <Box>
      <ChannelBar />
      <MemberList />
    </Box>
  );
}
