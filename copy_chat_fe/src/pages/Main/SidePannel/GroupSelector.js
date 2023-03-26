import React from "react";
import Groups from "../../../components/AfterAuth/SidePannel/Groups/Groups";
import NewGroup from "../../../components/AfterAuth/SidePannel/Groups/NewGroup";
import Home from "../../../components/AfterAuth/SidePannel/Home/Home";

import "./GroupSelector.css";

export default function GroupSelector({ setGroup }) {
  return (
    <>
      <div className="group_selector">
        <ul className="group_list">
          <Home />
          <Groups />
          <NewGroup />
        </ul>
      </div>
    </>
  );
}
