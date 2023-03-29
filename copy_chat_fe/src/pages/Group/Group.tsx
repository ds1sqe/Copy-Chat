import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "../../components/share/Navbar/Navbar";
import Sidebar from "../../components/share/SideBar/SideBar";
import Wrapper from "../../components/share/Wrapper";

import { actions as ui } from "../../store/ui";

import { Store } from "../../types/store";

export default function Group() {
  const { groupId, subgroupId }: any = useParams();

  const dispatch = useDispatch();
  const ui_current = useSelector((s: Store.AppState) => s.ui);

  // const group = useSelector();
  // const subgroup = useSelector();

  // useEffect(() => {
  //   dispatch(ui.pageSwitched({ group, subgroup }));
  // });

  return (
    <Wrapper>
      <Sidebar />
      <Navbar />
    </Wrapper>
  );
}
