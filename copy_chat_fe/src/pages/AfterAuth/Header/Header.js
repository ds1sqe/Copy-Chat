import React from "react";
import Greeting from "./Greeting";

export default function Header({ user }) {
  return (
    <div className="header">
      <Greeting user={user} />
    </div>
  );
}
