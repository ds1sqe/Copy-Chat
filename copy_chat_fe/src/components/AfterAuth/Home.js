import React from "react";

import Logout from "../Bridge/Logout";
import Header from "./Header/Header";

export default function Home({ auth, setAuth }) {
  return (
    <div className="home">
      <Header auth={auth} />
      <Logout setAuth={setAuth} />
    </div>
  );
}
