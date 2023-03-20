import React from "react";

import Logout from "../Bridge/Logout";
import Header from "./Header/Header";
import CheckToken from "../Bridge/CheckToken";

export default function Home({ getToken, setToken, user, setUser }) {
  return (
    <div className="home">
      <Header user={user} />
      <Logout setToken={setToken} />
      <CheckToken getToken={getToken} />
    </div>
  );
}
