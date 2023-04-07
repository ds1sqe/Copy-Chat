import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../components/share/Navbar/Navbar";
import Sidebar from "../../components/share/SideBar/SideBar";
import Wrapper from "../../components/share/Wrapper";
import { ui_actions } from "../../store/ui";

export default function DashBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ui_actions.pageSwitched({ Group: null, SubGroup: null }));
  });

  return (
    <Wrapper>
      <Sidebar />
      <Navbar />
    </Wrapper>
  );
}
