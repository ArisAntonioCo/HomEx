import { useCallback } from "react";
import LeftContent from "../components/left-content";
import { useNavigate } from "react-router-dom";
import "./signup-page.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const onLoginTextClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  return (
    <div className="signuppage">

      {/* LEFT CONTENT COMPONENT */}
      <LeftContent />

      {/* RIGHT CONTENT */}
      <section className="right-content">
        <form className="form">
          <div className="h11">
            <h1 className="create-an-account">Create an account</h1>
            <div className="enter-your-details">Enter your details below</div>
          </div>

          <div className="inputs">
            <div className="inputbox">
              <input className="email" placeholder="Email" type="text" />
            </div>

            <div className="inputbox1">
              <input className="username" placeholder="Username" type="text" />
            </div>

            <div className="inputbox2">
              <input className="password" placeholder="Password" type="text" />
            </div>

          </div>

           {/* SIGN UP BUTTON */}
          <button className="button">
            <div className="sign-up">Sign up</div>
          </button>
          <div className="link">
            <div className="already-have-an">Already have an account?</div>
            <div className="login" onClick={onLoginTextClick}>
              Login
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignupPage;
