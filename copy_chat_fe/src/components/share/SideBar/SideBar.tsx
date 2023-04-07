import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import SidebarIcons from "./Icons/SideBarIcons";
import SidePannel from "./Pannel/SidePannel";

export default function Sidebar() {
  return (
    <Container sx={{ display: "flex", flexDirection: "row" }}>
      <SidebarIcons />
      <SidePannel />
    </Container>
  );
}
