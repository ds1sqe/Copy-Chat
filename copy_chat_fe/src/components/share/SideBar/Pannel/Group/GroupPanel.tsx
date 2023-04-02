import GroupPannelHeader from "./submodules/GroupPannelHeader";

export default function GroupPannel() {
  return (
    <div className="GroupPannel">
      <GroupPannelHeader />
      <GroupPannel />
    </div>
  );
}
