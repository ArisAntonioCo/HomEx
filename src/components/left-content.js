import "./left-content.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const LeftContent = () => {
  const navigate = useNavigate();
  
  const onLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="left-content1" onClick={onLogoClick}>
      <div className="container19">
        <div className="logo-container">
          <div className="logo1">
            <img
              className="logo-icon1"
              loading="lazy"
              alt=""
              src="/leeplaza1.png"
            />
          </div>
        </div>
        <div className="text2">
          <h1 className="employee-container">
            <p className="start-tracking">Start Managing</p>
            <p className="employee-with-us">our employees <br/> effortlessly</p>
          </h1>
          <div className="effortlessly-stay-in1">
          Welcome back! Simplify your workday with our innovative Employee Management System. Log in to streamline your tasks and boost productivity effortlessly.
          </div>
        </div>
        <div className="copyright">
          <div className="copyright2024-co-faburada">
            Copyright©2024 Co, Faburada, Nato All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
