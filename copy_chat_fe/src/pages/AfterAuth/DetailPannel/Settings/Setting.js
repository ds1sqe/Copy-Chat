import React from "react";
import Groups from "./Groups/Groups";
import NewGroup from "./Groups/NewGroup";
import Home from "./Home/Home";

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
