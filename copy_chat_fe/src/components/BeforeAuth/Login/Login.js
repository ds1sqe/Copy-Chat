import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const REST_DOMAIN = process.env.REACT_APP_REST_DOMAIN;

export default function Login({ setUser, setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const login = axios.create({
      baseURL: REST_DOMAIN,
    });

    try {
      setFetching(true);
      const response = await login.request({
        url: "/account/login/",
        method: "post",
        data: { username: username, password: password },
      });
      const token = {
        access_token: response.data?.access_token,
        refresh_token: response.data?.refresh_token,
      };
      setUser(response.data?.user);
      navigate("/", { replace: true });
      setToken(token);
    } catch (error) {
      console.log("login faild");
      console.log("error", error);
      setError(error.message);
      setToken(null);
      setUser(null);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      {error && (
        <p className="login-faild">
          <strong>invalied password or username</strong>
        </p>
      )}
      {fetching && (
        <p className="login-loading">
          <strong>fetching...</strong>
        </p>
      )}
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
