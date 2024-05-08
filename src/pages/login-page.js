import { useCallback } from "react";
import LeftContent from "../components/left-content";
import { useNavigate } from "react-router-dom";
import "./login-page.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const onSignUpTextClick = useCallback(() => {
    navigate("/signup-page");
  }, [navigate]);

  return (
    <div className="loginpage">
       {/* LEFT COMPONENT */}
      <LeftContent />

       {/* RIGHT CONTENT */}
      <section className="right-content1">
        <form className="form1">
          <div className="h12">
            <h1 className="login-to-your">Login to your account</h1>
            <div className="enter-your-details1">Enter your details below</div>
          </div>
          <div className="inputs1">
            <div className="inputbox3">
              <input className="email1" placeholder="Email" type="text" />
            </div>
            <div className="inputbox4">
              <input className="password1" placeholder="Password" type="text" />
            </div>
          </div>

           {/* BUTTON */}
          <button className="button1">
            <div className="login1">Login</div>
          </button>

          <div className="link1">
            <div className="dont-have-an">Don’t have an account?</div>
            <div className="sign-up1" onClick={onSignUpTextClick}>
              Sign Up
            </div>
          </div>
          
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
