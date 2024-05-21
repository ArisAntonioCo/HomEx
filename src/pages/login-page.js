import { useState, useCallback, useEffect } from "react";
import LeftContent from "../components/left-content";
import { useNavigate } from "react-router-dom";
import "./login-page.css";


import { useDispatch, useSelector } from "react-redux";
import {loginUser} from "../Redux/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Get the loading and error states from the Redux store
  const { loading, error } = useSelector((state) => state.user);

  const onSignUpTextClick = useCallback(() => {
    navigate("/signup-page");
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Dispatch the loginUser action when the form is submitted
    const resultAction = await dispatch(loginUser(formData));

    // Check if login was successful
    if (loginUser.fulfilled.match(resultAction)) {
      // Login successful, navigate to dashboard (or wherever you want)
      navigate("/dashboard-page");
    } else {
      // Login failed, handle the error (e.g., display an error message)
      console.error("Login failed:", resultAction.error.message);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="loginpage">
       {/* LEFT COMPONENT */}
      <LeftContent />

       {/* RIGHT CONTENT */}
      <section className="right-content1">
      {loading && <div>Loading...</div>} 
      {error && <div className="error-message">{error.message}</div>}
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
          </div>

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
