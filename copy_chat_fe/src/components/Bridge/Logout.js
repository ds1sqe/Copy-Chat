import React from "react";

export default function Logout({ setAuth }) {
  return (
    <div className="logout-wrapper">
      <button type="button" onClick={() => setAuth(null)}>
        Logout
      </button>
    </div>
  );
}
