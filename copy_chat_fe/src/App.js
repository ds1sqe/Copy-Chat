import "./App.css";

// BeforeAuth
import Landing from "./components/BeforeAuth/Landing/Landing";
import Login from "./components/BeforeAuth/Login/Login";
import Register from "./components/BeforeAuth/Login/Register";
import ForgetPassword from "./components/BeforeAuth/Login/ForgetPassword";

// AfterAuth
import Home from "./components/AfterAuth/Home";

// Hooks
import useToken from "./hook/auth/useToken";
import useUser from "./hook/auth/useUser";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import React, { useState } from "react";

function App() {
  const { token, getToken, setToken } = useToken();
  const { user, setUser } = useUser();
  const [registerMessage, setRegisterMessage] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route
                path="/login"
                element={
                  <Login
                    setUser={setUser}
                    setToken={setToken}
                    registerMessage={registerMessage}
                  />
                }
              />
              <Route
                path="/register"
                element={<Register setRegisterMessage={setRegisterMessage} />}
              />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <Home
                    user={user}
                    setUser={setUser}
                    getToken={getToken}
                    setToken={setToken}
                  />
                }
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
