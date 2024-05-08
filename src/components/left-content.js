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
              src="/logo1.svg"
            />
          </div>
        </div>
        <div className="text2">
          <h1 className="start-tracking-expenses-container">
            <p className="start-tracking">Start Tracking</p>
            <p className="expenses-with-us">Expenses with us</p>
          </h1>
          <div className="effortlessly-stay-in1">
            Effortlessly stay in control of your household finances with our
            intuitive platform, tracking every expense from electricity to
            maintenance, so you can manage your budget with ease.
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
