import React, { useState } from "react";
import DetailPannel from "./DetailPannel/DetailPannel";
import GroupSelector from "./SidePannel/GroupSelector";

import "./Main.css";

export default function Main() {
  const [group, setGroup] = useState("");

  return (
    <div className="main">
      <GroupSelector group={group} setGroup={setGroup} />
      <DetailPannel group={group} />
    </div>
  );
}
