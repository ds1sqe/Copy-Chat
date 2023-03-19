import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";

const REST_DOMAIN = process.env.REACT_APP_REST_DOMAIN;

async function loginUser(credentials) {
  return fetch(REST_DOMAIN + "/account/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setAuth }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [isFaild, setIsFaild] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({
      username,
      password,
    });
    if (!result?.user) {
      console.log("login faild");
      setIsFaild(true);
      setAuth(null);
    } else {
      console.log(result);
      setAuth(result);
      navigate("/");
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      {isFaild && (
        <p className="login-faild">
          <strong>invalied password or username</strong>
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
  setAuth: PropTypes.func.isRequired,
};
