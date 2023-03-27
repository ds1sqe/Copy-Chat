import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <div className="reset-password-root">
      <h2>Reset your password</h2>
      <h5>Enter your email address and we will send you a new password</h5>
      <form action="">
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
        <Link to="/login/">
          <p>
            <label className="forgot-login"> return to login menu</label>
          </p>
        </Link>
        <Link to="/register/">
          <p>
            First time?
            <label className="forgot-register"> Create an account</label>
          </p>
        </Link>
      </footer>
    </div>
  );
}
