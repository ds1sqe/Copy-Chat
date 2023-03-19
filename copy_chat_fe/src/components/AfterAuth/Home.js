import React from "react";

import Logout from "../Bridge/Logout";
import Header from "./Header/Header";
import CheckToken from "../Bridge/CheckToken";

export default function Home({ auth, setAuth }) {
  return (
    <div className="home">
      <Header auth={auth} />
      <Logout setAuth={setAuth} />
      <CheckToken token={auth?.access_token} />
    </div>
  );
}
