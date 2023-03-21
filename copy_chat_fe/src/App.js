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

import React from "react";

function App() {
  const { isToken, getToken, setToken } = useToken();
  const { user, setUser } = useUser();

  // Not authorized
  if (!isToken) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<Login setUser={setUser} setToken={setToken} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
