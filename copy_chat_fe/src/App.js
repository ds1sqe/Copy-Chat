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
import { AxiosInstanceProvider } from "./hook/endpoint/axios/useAxios";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";
const REST_DOMAIN = process.env.REACT_APP_REST_DOMAIN;

function App() {
  const { isToken, getToken, setToken } = useToken();
  const { user, setUser } = useUser();

  // Not authorized
  return (
    <div className="App">
      <AxiosInstanceProvider config={{ baseURL: REST_DOMAIN }}>
        <BrowserRouter>
          <Routes>
            {!isToken ? (
              <>
                <Route path="/" element={<Landing />} />
                <Route
                  path="/login"
                  element={<Login setUser={setUser} setToken={setToken} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
              </>
            ) : (
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
            )}
          </Routes>
        </BrowserRouter>
      </AxiosInstanceProvider>
    </div>
  );
}

export default App;
