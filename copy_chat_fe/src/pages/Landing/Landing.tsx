import { Link } from "react-router-dom";
import Wrapper from "../../components/share/Wrapper";

export default function Landing() {
  return (
    <Wrapper>
      <div className="landing-root">
        <header className="landing-header">Login / Register</header>
        <div className="landing-button-root">
          <Link to="login">
            <button className="landing-button-login">log in</button>
          </Link>

          <Link to="register">
            <button className="landing-button-register">
              <span>register </span>
            </button>
          </Link>
        </div>
        <p className="landing-para">join us now</p>
      </div>
    </Wrapper>
  );
}
