import React from "react";

export default function NewGroup({ setGroup }) {
  function setGroupTo() {
    console.log("setGroup to Home");
    setGroup("/");
  }

  return (
    <>
      <li>
        <button className="group_button" onClick={setGroupTo}>
          new group
        </button>
      </li>
    </>
  );
}
