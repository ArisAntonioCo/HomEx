import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);


  const onLoginTextClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  const onButtonClick = useCallback(() => {
    navigate("/signup-page");
  }, [navigate]);

  return (
    <header className="navbar">
      
      {/* LOGO */}
      <div className="container20" >
        <div className="left-frame" onClick={onLogoClick}>
          <img
            className="vector-icon14"
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>


        <nav className="links">

          {/* ABOUT US LINK */}
          <Link
            className="about-us1"
            to="/about-page"
          >
            About us
          </Link>

          {/* Pwede ni sya mu auto scroll padulong
          sa footer kay naa didto ato contacts */}
          <a className="contact">
            Contact
          </a>

         {/* FAQ LINK */}
          <Link 
            className="faq"
            to="/faq-page">
            FAQ
          </Link>
          
        </nav>

        <div className="right-frame">
          <b className="login2" onClick={onLoginTextClick}>
            Login
          </b>
          <button className="button3" onClick={onButtonClick}>
            <div className="sign-up2">Sign up</div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
