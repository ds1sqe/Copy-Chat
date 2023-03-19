import React from "react";
import Greeting from "./Greeting";

export default function Header({ auth }) {
  return (
    <div className="header">
      <Greeting auth={auth} />
    </div>
  );
}
