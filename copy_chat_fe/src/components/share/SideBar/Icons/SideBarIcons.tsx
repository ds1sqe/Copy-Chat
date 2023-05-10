import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Store } from "../../../../types/store";
import AddGroup from "./subcomponents/AddGroup";
import DashBoardIcon from "./subcomponents/DashBoardIcon";
import GroupList from "./subcomponents/GroupList";

export default function SidebarIcons() {
  const showIcons = useSelector((s: Store.AppState) => s.ui.sidebar.open);
  if (!showIcons) {
    return null;
  } else {
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
}
