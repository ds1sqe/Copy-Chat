import "./App.css";

import Landing from "./components/BeforeAuth/Landing/Landing";
import Login from "./components/BeforeAuth/Login/Login";
import Register from "./components/BeforeAuth/Login/Register";
import ForgetPassword from "./components/BeforeAuth/Login/ForgetPassword";

import Home from "./components/AfterAuth/Home";

import useAuth from "./hook/auth/useAuth";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";

function App() {
  const { auth, setAuth } = useAuth();

  // Not authorized
  if (!auth) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
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
          <Route path="/" element={<Home auth={auth} setAuth={setAuth} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
