import React from "react";

import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <div className="reset-password-root">
      <h2>Reset your password</h2>
      <h5>Enter your email address and we will send you a new password</h5>
      <form action="/login">
        <p>
          <label id="reset-password-email">Email address</label>
          <br />
          <input type="email" name="email" required />
        </p>
        <p>
          <button type="submit">Send password reset email</button>
        </p>
      </form>

      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Landingpage</Link>.
        </p>
      </footer>
    </div>
  );
}
