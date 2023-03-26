import "./App.css";

// BeforeAuth
import Landing from "./pages/BeforeAuth/Landing/Landing";

// AfterAuth
import Main from "./pages/AfterAuth/Main";

// Hooks
import useToken from "./hook/auth/useToken";
import useUser from "./hook/auth/useUser";

import React, { useState } from "react";

function App() {
  const { token, getToken, setToken } = useToken();
  const { user, setUser } = useUser();

  return (
    <div className="App">
      {!token ? (
        <>
          <Landing setToken={setToken} setUser={setUser} />
        </>
      ) : (
        <>
          <Main
            user={user}
            setUser={setUser}
            getToken={getToken}
            setToken={setToken}
          />
        </>
      )}
    </div>
  );
}

export default App;
