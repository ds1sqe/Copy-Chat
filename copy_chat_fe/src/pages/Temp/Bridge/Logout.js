import React from "react";

export default function Logout({ setToken, setUser }) {
  return (
    <div className="logout-wrapper">
      <button
        type="button"
        onClick={() => {
          setToken(null);
          setUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );
}
