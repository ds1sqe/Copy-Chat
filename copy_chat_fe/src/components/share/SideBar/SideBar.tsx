import CreateGroup from "./subcomponents/CreateGroup";
import GroupList from "./subcomponents/GroupList";

export default function Sidebar() {
  return (
    <div className="sidebar flex float left">
      <GroupList />
      <CreateGroup />
    </div>
  );
}
