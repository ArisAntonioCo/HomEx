import { useEffect } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./drawer.css";

const Drawer = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

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

  return (
    <div className="drawer" data-animate-on-scroll>
      <div className="container">
        <div className="logo">
          <img className="logo-icon" alt="" src="/logo@2x.png" />
        </div>
        <div className="options">

          {/*HOME BUTTON*/}
          <button className="navlinks" onClick={onNavlinksContainerClick}>
            <img className="homeicon" alt="" src="/vector@2x.png" />
            <div className="home">Home</div>
          </button>

          {/*DASHBOARD BUTTON*/}
          <button className="navlinks" onClick={onNavlinksContainer1Click}>
            <img className="dashicon" alt="" src="/vector-1@2x.png" />
            <div className="dashboard">Dashboard</div>
          </button>

          {/*ELECTRICITY BUTTON*/}
          <button className="navlinks" onClick={onNavlinksContainer2Click}>
            <img className="elecicon" alt="" src="/vector-2@2x.png" />
            <div className="electricity">Electricity</div>
          </button>

          {/*WATER BUTTON*/}
          <button className="navlinks" onClick={onNavlinksContainer3Click}>
            <img className="watericon" alt="" src="/vector-3@2x.png" />
            <div className="water">Water</div>
          </button>

          {/*FOOD BUTTON*/}
          <button className="navlinks" onClick={onNavlinksContainer4Click}>
            <img className="foodicon" alt="" src="/vector-4@2x.png" />
            <div className="food">Food</div>
          </button>

          {/*MAINTENANCE BUTTON*/}
          <button className="navlinks" onClick={onNavlinksContainer5Click}>
            <img className="mainticon" alt="" src="/vector-5.svg" />
            <div className="maintenance">Maintenance</div>
          </button>

          {/*MISC BUTTON*/}
          <button className="navlinks" onClick={onNavlinksContainer6Click}>
            <img className="miscicon" alt="" src="/vector-6@2x.png" />
            <div className="miscellaneous">Miscellaneous</div>
          </button>

          {/*ABOUT BUTTON*/}
          <button className="navlinks" onClick={onNavlinksContainer7Click}>
            <img className="abouticon" alt="" src="/vector-7@2x.png" />
            <div className="about">About</div>
          </button>


          {/*SIGN OUT BUTTON*/}
          <button className="navlinks">
            <img className="signouticon" alt="" src="/vector-9@2x.png" />
            <div className="sign-out">Sign out</div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Drawer;
