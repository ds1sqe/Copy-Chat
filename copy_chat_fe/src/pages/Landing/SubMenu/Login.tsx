import { useState } from "react";
import "./Login.css";

import { useDispatch } from "react-redux";

import { loginUser } from "../../../dispatcher/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    loginUser(payload, dispatch);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>

      <form action="" onSubmit={handleLogin}>
        <label>
          <p>Username</p>
          <input
            type="text"
            autoComplete="username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Password</p>

          <input
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <footer>
        <p>
          Did you forgot password?
          <Link to="/forgot-password/">
            <label className="login-forgot-password"> Reset my password</label>
          </Link>
        </p>
        <p>
          First time?
          <Link to="/register/">
            <label className="login-register"> Create an account</label>
          </Link>
        </p>
      </footer>
    </div>
  );
}
