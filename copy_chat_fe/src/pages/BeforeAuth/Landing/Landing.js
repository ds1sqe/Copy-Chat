import { useState } from "react";
import ForgetPassword from "../../../components/BeforeAuth/Landing/Login/ForgetPassword";
import Login from "../../../components/BeforeAuth/Landing/Login/Login";
import Register from "../../../components/BeforeAuth/Landing/Login/Register";
import "./Landing.css";

export default function Landing({ setToken, setUser }) {
  const [menu, setMenu] = useState("");
  const [registerMessage, setRegisterMessage] = useState(null);

  switch (menu) {
    case "login":
      return (
        <Login
          setToken={setToken}
          setUser={setUser}
          setMenu={setMenu}
          registerMessage={registerMessage}
        />
      );
    case "register":
      return (
        <Register setRegisterMessage={setRegisterMessage} setMenu={setMenu} />
      );
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
