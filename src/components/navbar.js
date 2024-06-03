import React, { useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, getUserData } from "../Redux/userSlice";
import "./navbar.css";

const Navbar = ({ scrollToContact }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const handle = useSelector((state) => state.user.credentials?.handle);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Click Handlers (concise format using useNavigate)
  const onLogoClick = useCallback(() => navigate("/"), [navigate]);
  const onLoginTextClick = useCallback(() => navigate("/login-page"), [navigate]);
  const onButtonClick = useCallback(() => navigate("/signup-page"), [navigate]);
  const onDashboardClick = useCallback(() => navigate("/dashboard"), [navigate]); // NEW

  // Authentication Check (useEffect for initial rendering)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
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
          <img className="vector-icon14" alt="" src="/leeplaza.png" />
        </div>

        <nav className="links">
          {/* Removed links */}
          {isAuthenticated && ( // Only show if logged in
            <Link className="contact" to="/dashboard-page">Dashboard</Link> 
          )}
        </nav>

        {/* Right Frame (login/logout logic) */}
        <div className="right-frame">
          {loading ? (
            <div>Loading...</div>
          ) : isAuthenticated && handle ? (
            <>
              <b className="signout" onClick={handleLogout}>Sign Out</b>
            </>
          ) : (
            <>
              <b className="login2" onClick={onLoginTextClick}>Login</b>
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
