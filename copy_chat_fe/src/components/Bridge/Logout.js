import React from "react";

export default function Logout({ setToken }) {
  return (
    <div className="logout-wrapper">
      <button type="button" onClick={() => setToken(null)}>
        Logout
      </button>
    </div>
  );
}
