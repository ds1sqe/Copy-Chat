import { Box } from "@mui/material";
import AddGroup from "./subcomponents/AddGroup";
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
      <AddGroup />
    </Box>
  );
}
