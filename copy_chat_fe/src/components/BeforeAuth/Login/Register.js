import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register-wrapper">
      <h2>Join us</h2>
      <h5>Create your account</h5>

      <form>
        <p>
          <label>Username</label>
          <br />
          <input type="text" name="username" required />
        </p>
        <p>
          <label>Email address</label>
          <br />
          <input type="email" name="email" autoComplete="email" />
        </p>
        <p>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
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
