import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../../store/sideEffects/auth";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password: password,
    };
    registerUser(payload, dispatch);
  };

  return (
    <div className="register-wrapper">
      <h2>Join us</h2>
      <h5>Create your account</h5>

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
        <Link to="/">
          <p>Back to Landing Page.</p>
        </Link>
      </footer>
    </div>
  );
}
