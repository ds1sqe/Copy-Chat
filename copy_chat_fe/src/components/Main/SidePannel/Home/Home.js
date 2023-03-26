import React from "react";

export default function Home({ setGroup }) {
  function setHome() {
    console.log("setGroup to Home");
    setGroup("/");
  }

  return (
    <>
      <li>
        <button className="home_button" onClick={setHome}>
          home
        </button>
      </li>
    </>
  );
}
