import { Box } from "@mui/material";
import CreateGroup from "./subcomponents/CreateGroup";
import DashBoardIcon from "./subcomponents/DashBoardIcon";
import GroupList from "./subcomponents/GroupList";

export default function SidebarIcons() {
  return (
    <Box
      sx={{
        display: "flex",
        float: "left",
        flexDirection: "column",
        border: "1px solid gray",
      }}
    >
      <DashBoardIcon />
      <GroupList />
      <CreateGroup />
    </Box>
  );
}
