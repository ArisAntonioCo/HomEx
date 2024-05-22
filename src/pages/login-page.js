import { useState, useCallback, useEffect } from "react";
import LeftContent from "../components/left-content";
import { useNavigate, useLocation } from "react-router-dom";
import "./login-page.css";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/userSlice";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const LoginPage = () => {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const location = useLocation();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const succMessage = location.state?.succMessage;
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Modify this useEffect
  useEffect(() => {
    if (succMessage && !hasShown) {
      setOpen(true);
      setHasShown(true);
    }
  }, [succMessage, hasShown]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Get the loading and error states from the Redux store
  const { loading, error } = useSelector((state) => state.user);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSignUpTextClick = useCallback(() => {
    navigate("/signup-page");
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Dispatch the loginUser action when the form is submitted
    if (!formData.email || !formData.password) {
      return;
    }
    const resultAction = await dispatch(loginUser(formData));

    // Check if login was successful
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard-page", {
        state: { successMessage: "Login successful!" },
      });
    } else {
      // Login failed, handle the error (e.g., display an error message)
      console.error("Login failed:", resultAction.error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email && user.password) {
      dispatch(loginUser(user));
    }
  }, [dispatch]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setFormError(null);
  };

  return (
    <div className="loginpage">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          {succMessage}
        </MuiAlert>
      </Snackbar>
      {/* LEFT COMPONENT */}
      <LeftContent />

      {/* RIGHT CONTENT */}
      <section className="right-content1">
        <form className="form1" onSubmit={handleSubmit}>
          <div className="h12">
            <h1 className="login-to-your">Login to your account</h1>
            <div className="enter-your-details1">Enter your details below</div>
          </div>
          <div className="inputs1">
            <div className="inputbox3">
              <input
                className="email"
                placeholder="Email"
                type="email"
                name="email" // Make sure the name matches the backend field
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="inputbox4">
              <input
                className="password"
                placeholder="Password"
                type="password"
                name="password" // Make sure the name matches the backend field
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {loading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
          </div>

          {(error || formError) && (
            <Alert severity="error">
              {error ? "Invalid Credentials" : formError}
            </Alert>
          )}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {/* BUTTON */}
          <button className="button1" type="submit">
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
