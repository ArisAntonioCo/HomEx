import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  

  const onNavlinksContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onNavlinksContainer1Click = useCallback(() => {
    navigate("/dashboard-page");
  }, [navigate]);

  const onNavlinksContainer2Click = useCallback(() => {
    navigate("/electricity-page");
  }, [navigate]);

  const onNavlinksContainer3Click = useCallback(() => {
    navigate("/water-page");
  }, [navigate]);

  const onNavlinksContainer4Click = useCallback(() => {
    navigate("/food-page");
  }, [navigate]);

  const onNavlinksContainer5Click = useCallback(() => {
    navigate("/maint-page");
  }, [navigate]);

  const onNavlinksContainer6Click = useCallback(() => {
    navigate("/misc-page");
  }, [navigate]);

  const onNavlinksContainer7Click = useCallback(() => {
    navigate("/about-page");
  }, [navigate]);

  const onNavlinksContainer8Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="sidebar">
      <div className="logo">
      <img
            className="vector-icon14"
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
      </div>
      <div className="options">

        {/* HOME BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainerClick}>
          <img className="vector-icon4" alt="" src="/vector@2x.png" />
          <div className="home">Home</div>
        </div>

        {/* DASHBOARD BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer1Click}>
          <img className="vector-icon5" alt="" src="/vector-1@2x.png" />
          <div className="dashboard1">Dashboard</div>
        </div>

        <div className="text">
          <div className="expenses5">EXPENSES</div>
        </div>

        {/* ELECTRICITY BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer2Click}>
          <img className="vector-icon6" alt="" src="/vector-2@2x.png" />
          <div className="electricity5">Electricity</div>
        </div>

        {/* WATER BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer3Click}>
          <img className="vector-icon7" alt="" src="/vector-3@2x.png" />
          <div className="water3">Water</div>
        </div>

        {/* FOOD BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer4Click}>
          <img className="vector-icon8" alt="" src="/vector-4@2x.png" />
          <div className="food3">Food</div>
        </div>

        {/* MAINTENANCE BUTTON*/}
        <div className="navlinks" onClick={onNavlinksContainer5Click}>
          <img
            className="vector-icon9"
            loading="lazy"
            alt=""
            src="/vector-5.svg"
          />
          <div className="maintenance3">Maintenance</div>
        </div>

        {/* MISC BUTTON */}
        <div className="navlinks" onClick={onNavlinksContainer6Click}>
          <img
            className="vector-icon10"
            loading="lazy"
            alt=""
            src="/vector-6@2x.png"
          />
          <div className="miscellaneous1">Miscellaneous</div>
        </div>

        <div className="text1">
          <div className="information">INFORMATION</div>
        </div>

        {/* ABOUT BUTTON*/}
        <div className="navlinks" onClick={onNavlinksContainer7Click}>
          <img className="vector-icon11" alt="" src="/vector-7@2x.png" />
          <div className="about">About</div>
        </div>

        {/* CONTACT BUTTON */}
        <div className="navlinks">
          <img className="vector-icon12" alt="" src="/vector-8@2x.png" />
          <div className="contact-us">Contact us</div>
        </div>
        
      </div>

      {/* SIGN OUT BUTTON */}
      <div className="navlinks">
        <div className="container18">
          <img className="vector-icon13" alt="" src="/vector-9@2x.png" />
          <div className="sign-out">Sign out</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
