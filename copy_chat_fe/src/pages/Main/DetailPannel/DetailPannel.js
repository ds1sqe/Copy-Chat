import React from "react";
import DmList from "../../../components/AfterAuth/DetailPannel/DmList";
import Friends from "../../../components/AfterAuth/DetailPannel/Friends";
import Members from "../../../components/AfterAuth/DetailPannel/Members";
import Profile from "../../../components/AfterAuth/DetailPannel/Profile";

import "./DetailPannel.css";
export default function DetailPannel({ group }) {
  switch (group) {
    case "":
      return (
        <div className="detail_pannel">
          <Friends />
          <DmList />
          <Profile />
        </div>
      );
    default:
      return (
        <div className="detail_pannel">
          <Members group={group} />
          <Profile />
        </div>
      );
  }
}
