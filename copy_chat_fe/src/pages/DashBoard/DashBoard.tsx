import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/share/SideBar/SideBar";
import Wrapper from "../../components/share/Wrapper";
import { ui_actions } from "../../store/ui";

export default function DashBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ui_actions.deleteFocusGroup());
    dispatch(ui_actions.deleteFocusSubgroup());
    dispatch(ui_actions.deleteFocusChannel());
  });

  return (
    <Wrapper>
      <Sidebar />
    </Wrapper>
  );
}
