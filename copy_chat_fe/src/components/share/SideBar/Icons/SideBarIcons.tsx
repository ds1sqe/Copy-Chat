import CreateGroup from "./subcomponents/CreateGroup";
import DashBoardIcon from "./subcomponents/DashBoardIcon";
import GroupList from "./subcomponents/GroupList";

export default function SidebarIcons() {
  return (
    <div className="sidebarIcons flex float left">
      <DashBoardIcon />
      <GroupList />
      <CreateGroup />
    </div>
  );
}
