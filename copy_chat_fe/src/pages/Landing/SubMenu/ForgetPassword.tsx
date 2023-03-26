import { Dispatch, SetStateAction } from "react";

interface Props {
  setMenu: Dispatch<SetStateAction<string>>;
}

export default function ForgetPassword(props: Props) {
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
          <label
            className="login-register"
            onClick={() => props.setMenu("login")}
          >
            {" "}
            return to login menu
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
