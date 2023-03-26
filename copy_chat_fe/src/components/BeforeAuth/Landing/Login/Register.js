import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ setRegisterMessage }) {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [success, setSuccess] = useState(false);

  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const REST_DOMAIN = process.env.REACT_APP_REST_DOMAIN;
  const navigate = useNavigate();

  if (success) {
    navigate("/login", { replace: false });
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const register = axios.create({
      baseURL: REST_DOMAIN,
    });

    let payload = {
      username: username,
      password: password,
    };
    if (email !== undefined && email !== null) {
      payload = {
        ...payload,
        email: email,
      };
    }

    try {
      setFetching(true);
      const response = await register.request({
        url: "/account/register/",
        method: "post",
        data: payload,
      });

      console.log(response.data);
      setFetching(false);
      if (response.data?.success) {
        console.log("login successed");
        setRegisterMessage("Account created, please login.");
        setSuccess(true);
      } else {
        setError(response?.data?.msg);
      }
    } catch (error) {
      console.log("register faild");
      console.log("error", error);
      setError(error.message);
    }
  };

  return (
    <div className="register-wrapper">
      <h2>Join us</h2>
      <h5>Create your account</h5>
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
      <form onSubmit={handleRegister}>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </p>
        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
          <span>
            I agree all statements in{" "}
            <a href="https://google.com">terms of service</a>
          </span>
          .
        </p>
        <p>
          <button type="submit">Register</button>
        </p>
      </form>

      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
