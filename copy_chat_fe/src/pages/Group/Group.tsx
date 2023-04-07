import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import Navbar from "../../components/share/Navbar/Navbar";
import Sidebar from "../../components/share/SideBar/SideBar";
import Wrapper from "../../components/share/Wrapper";
import { RootState } from "../../store/configStore";
import { findGroup } from "../../store/selectors/group";

import { ui_actions } from "../../store/ui";

export default function Group() {
  const { groupId, subgroupId } = useParams();

  const dispatch = useDispatch();

  const ui_current = useSelector((s: RootState) => s.ui);
  const group = useSelector(findGroup(Number(groupId)));

  useEffect(() => {
    dispatch(ui_actions.pageSwitched({ Group: group }));
  });

  if (!group) {
    return (
      <Wrapper>
        <Navigate to={`/@me/`} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Sidebar />
      <Navbar />
    </Wrapper>
  );
}
