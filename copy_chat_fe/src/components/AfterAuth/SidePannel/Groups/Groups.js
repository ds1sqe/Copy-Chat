import React from "react";

export default function Groups({ setGroup }) {
  function setGroupTo() {
    console.log("setGroup to Home");
    setGroup("/");
  }

  return (
    <>
      <li>
        <button className="group_button" onClick={setGroupTo}>
          groups
        </button>
      </li>
    </>
  );
}
