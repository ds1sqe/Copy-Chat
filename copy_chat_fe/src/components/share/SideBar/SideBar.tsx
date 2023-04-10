// import { Grid } from "@mui/material";
// import { Container } from "@mui/system";
import { Box } from "@mui/material";
import SidebarIcons from "./Icons/SideBarIcons";
import SidePannel from "./Pannel/SidePannel";

export default function Sidebar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "2px gray dashed",
      }}
    >
      <SidebarIcons />
      <SidePannel />
    </Box>
  );
}
