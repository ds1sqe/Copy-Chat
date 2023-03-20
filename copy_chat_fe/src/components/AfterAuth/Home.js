import React from "react";

import Logout from "../Bridge/Logout";
import Header from "./Header/Header";
import CheckToken from "../Bridge/CheckToken";

export default function Home({ token, setToken, user, setUser }) {
  return (
    <div className="home">
      <Header user={user} />
      <Logout setToken={setToken} />
      <CheckToken token={token} />
    </div>
  );
}
