import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import { useAxiosAtEvent } from "../../../hook/endpoint/axios/useAxios";

export default function Login({ setUser, setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
r const [isFaild, setIsFaild] = useState(false);
  const navigate = useNavigate();

  const { data, error, loading, loaded, fire } = useAxiosAtEvent();

  function check_login() {
    console.log("check login");
    console.log(data);
    if (error) {
      console.log("login faild");
      console.log("error");
      setIsFaild(true);
      setToken(null);
      setUser(null);
    } else if (data) {
      console.log("user logined", data);
      const token = {
        access_token: data?.access_token,
        refresh_token: data?.refresh_token,
      };
      setUser(data?.user);
      setToken(token);
      navigate("/");
    }
  }

  const handleSubmit = async (e) => {
    await fire({
      url: "/account/login/",
      method: "post",
      payload: { username, password },
      callback: check_login,
    });
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      {error && (
        <p className="login-faild">
          <strong>invalied password or username</strong>
        </p>
      )}
      {loading && (
        <p className="login-loading">
          <strong>loading...</strong>
        </p>
      )}
      <form action="" onSubmit={handleSubmit}>
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
          <Link to="/forget-password">
            <label className="login-forget-password"> Reset my password</label>
          </Link>
        </p>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
      </footer>
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};
