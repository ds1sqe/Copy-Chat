import "./App.css";

import Login from "./components/Account/Login";
import Body from "./components/Body/Body";
import SidePannel from "./components/SidePannel/SidePannel";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import useAuth from "./hook/auth/useAuth";

function App() {
  const { auth, setAuth } = useAuth();

  if (!auth) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <div className="App">
      <h1>APP</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/sidepannel" element={<SidePannel />} />
          <Route path="/body" element={<Body />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
