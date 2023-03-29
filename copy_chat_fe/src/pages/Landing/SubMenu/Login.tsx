import { useEffect, useState } from "react";
import "./Login.css";

import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../types/store";
import { loginUser } from "../../../store/sideEffects/auth";
import { actions as auth } from "../../../store/auth";
import Wrapper from "../../../components/share/Wrapper";

export default function Login() {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const logined = useSelector((s: Store.AppState) => s.auth.logined);
  const isCreated = useSelector((s: Store.AppState) => s.auth.hasCreated);
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    loginUser(payload, dispatch);
  };

  useEffect(() => {
    dispatch(auth.resetCreated());
  }, [dispatch, isCreated]);

  if (logined) {
    return (
      <Wrapper>
        <Navigate to={`/@me/`} />;
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
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
                <label className="login-forgot-password">
                  {" "}
                  Reset my password
                </label>
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
      </Wrapper>
    );
  }
}
