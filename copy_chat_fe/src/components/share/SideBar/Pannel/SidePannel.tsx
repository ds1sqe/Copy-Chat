import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configStore";
import GroupPannel from "./Group/GroupPanel";
import MyPannel from "./Me/MyContents";

export default function SidePannel() {
  const group = useSelector((s: RootState) => s.ui.activeGroup);

  return (
    <div className="sidePannel">
      {group && <GroupPannel />}
      {!group && <MyPannel />}
    </div>
  );
}
