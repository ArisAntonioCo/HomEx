import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftContent from "../components/left-content";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Redux/userSlice"; // Import the signupUser action
import "./signup-page.css";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "", // Add this field for the username/handle
  });
const [loading, setLoading] = useState(false);
  // Add a state variable for the error message
  const [errorMessage, setErrorMessage] = useState("");

  // Add a function to handle closing the success alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessage("");
  };

  // Add a function to handle closing the error alert
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorMessage("");
  };


const handleSubmit = async (event) => {
  event.preventDefault();

  // Form validation
  if (!formData.email || !formData.password || !formData.confirmPassword || !formData.handle) {
    setErrorMessage("All fields are required.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setErrorMessage("Passwords do not match.");
    return;
  }

  // Dispatch the signupUser action
  const resultAction = await dispatch(signupUser(formData));

  // Check if signup was successful
  if (signupUser.fulfilled.match(resultAction)) {
    // Signup successful, navigate to dashboard (or wherever you want)
    navigate("/login-page", {
      state: { succMessage: "Sign up successful!" },
    });
  } else {
    // Signup failed, handle the error (e.g., display an error message)
    console.error("Signup failed:", resultAction.error);
    setErrorMessage("Signup failed. Please try again.");
    // You can display the error.email or error.password directly in the UI
  }
};

  const onLoginTextClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="signuppage">
      {/* LEFT CONTENT COMPONENT */}
      <LeftContent />

      {/* RIGHT CONTENT */}
      <section className="right-content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="h11">
            <h1 className="create-an-account">Create an account</h1>
            <div className="enter-your-details">Enter your details below</div>
          </div>

          <div className="inputs">
            <div className="inputbox">
              <input
                className="email"
                placeholder="Email"
                type="email"
                name="email" // Make sure the name matches the backend field
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="inputbox1">
              <input
                className="username"
                placeholder="Username"
                type="text"
                name="handle" // Make sure the name matches the backend field
                value={formData.handle}
                onChange={handleChange}
              />
            </div>

            <div className="inputbox2">
              <input
                className="password"
                placeholder="Password"
                type="password"
                name="password" // Make sure the name matches the backend field
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="inputbox2">
              <input
                className="password"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword" // Make sure the name matches the backend field
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {loading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
          </div>
          {/* Error Messages */}
          {errorMessage && (
            <MuiAlert
              onClose={handleErrorClose}
              severity="error"
              elevation={6}
              variant="filled"
            >
              {errorMessage}
            </MuiAlert>
          )}
          {/* SIGN UP BUTTON */}
          <button className="button" type="submit">
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
