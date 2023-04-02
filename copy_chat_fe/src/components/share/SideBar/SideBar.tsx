import { Grid } from "@mui/material";
import SidebarIcons from "./Icons/SideBarIcons";
import SidePannel from "./Pannel/SidePannel";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Grid container spacing={1}>
        <SidebarIcons />
        <SidePannel />
      </Grid>
    </div>
  );
}
