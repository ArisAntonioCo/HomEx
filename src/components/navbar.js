import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, getUserData } from "../Redux/userSlice";
import "./navbar.css";

const Navbar = ({ scrollToContact }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const handle = useSelector((state) => state.user.credentials?.handle);

  const dispatch = useDispatch();
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

  // Check authentication status on initial render
  useEffect(() => {
    console.log("useEffect triggered"); // This log should appear in the console
    const storedToken = localStorage.getItem("token");
    console.log("Stored token:", storedToken); // Log the stored token
if (storedToken) {
  dispatch(getUserData(storedToken));
}
  }, [dispatch]); 

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    navigate("/login-page");
  }, [dispatch, navigate]);

  return (
    <header className="navbar">
      <div className="container20">
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
          <Link className="about-us1" to="/about-page">
            About us
          </Link>

          {/* CONTACT LINK - Updated to a div for scroll functionality */}
          <div
            className="contact"
            onClick={scrollToContact}
            style={{ cursor: "pointer" }}
          >
            Contact
          </div>

          {/* FAQ LINK */}
          <Link className="faq" to="/faq-page">
            FAQ
          </Link>
        </nav>

        <div className="right-frame">
        {loading ? (
          // Loading Indicator
          <div>Loading...</div> 
        ) : isAuthenticated && handle ?(
          // Logged In: Display handle and logout button
          <>
            <b className="signup" onClick={handleLogout}>Sign Out</b>
          </>
        ) : (
          // Not Logged In: Display login and signup buttons
          <>
            <b className="login2" onClick={onLoginTextClick}>
                Login
              </b>
              <button className="signup" onClick={onButtonClick}>
                <div className="sign-up2">Sign up</div>
              </button>
          </>
        )}
      </div>
      </div>
    </header>
  );
};

export default Navbar;
