import { useState } from "react";

import "./Landing.css";
import Login from "./SubMenu/Login";
import Register from "./SubMenu/Register";
import ForgetPassword from "./SubMenu/ForgetPassword";

export default function Landing() {
  const [menu, setMenu] = useState("");

  switch (menu) {
    case "login":
      return <Login setMenu={setMenu} />;
    case "register":
      return <Register setMenu={setMenu} />;
    case "forgot":
      return <ForgetPassword setMenu={setMenu} />;

    default:
      return (
        <div className="landing-root">
          <header className="landing-header">Login / Register</header>
          <div className="landing-button-root">
            <button
              className="landing-button-login"
              onClick={() => setMenu("login")}
            >
              log in
            </button>
            <button
              className="landing-button-register"
              onClick={() => setMenu("register")}
            >
              <span>register </span>
            </button>
          </div>
          <p className="landing-para">join us now</p>
        </div>
      );
  }
}
