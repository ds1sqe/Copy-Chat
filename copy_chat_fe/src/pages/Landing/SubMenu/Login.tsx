import { useState, Dispatch, SetStateAction } from "react";
import "./Login.css";

import { useDispatch } from "react-redux";

import { loginUser } from "../../../dispatcher/auth";

interface Props {
  setMenu: Dispatch<SetStateAction<string>>;
}

export default function Login(props: Props) {
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
          <label
            className="login-forget-password"
            onClick={() => props.setMenu("forget")}
          >
            {" "}
            Reset my password
          </label>
        </p>
        <p>
          First time?
          <label
            className="login-register"
            onClick={() => props.setMenu("register")}
          >
            {" "}
            Create an account
          </label>
        </p>
      </footer>
    </div>
  );
}
