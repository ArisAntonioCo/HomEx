import { useCallback, useEffect } from "react";
import {} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./drawer.css";

const Drawer = ({ onClose }) => {
  const navigate = useNavigate();
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

  const onNavlinksClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="drawer" data-animate-on-scroll>
      <section className="container19">
        <div className="logo1">
          <img
            className="logo-icon1"
            loading="lazy"
            alt=""
            src="/logo2@2x.png"
          />
        </div>
        <div className="options1">
          <button className="navlinks9" onClick={onNavlinksClick}>
            <img
              className="dashboard-icon"
              loading="lazy"
              alt=""
              src="/vector2@2x.png"
            />
            <div className="home2">Home</div>
          </button>
          <button className="navlinks10">
            <img className="vector-icon23" alt="" src="/vector-11@2x.png" />
            <div className="dashboard4">Dashboard</div>
          </button>
          <button className="navlinks11">
            <img className="vector-icon24" alt="" src="/vector-21@2x.png" />
            <div className="electricity8">Electricity</div>
          </button>
          <button className="navlinks12">
            <img className="vector-icon25" alt="" src="/vector-32@2x.png" />
            <div className="water6">Water</div>
          </button>
          <button className="navlinks13">
            <img className="vector-icon26" alt="" src="/vector-41@2x.png" />
            <div className="food6">Food</div>
          </button>
          <button className="navlinks14">
            <img className="vector-icon27" loading="lazy" alt="" />
            <div className="maintenance6">Maintenance</div>
          </button>
          <button className="navlinks15">
            <img
              className="vector-icon28"
              loading="lazy"
              alt=""
              src="/vector-61@2x.png"
            />
            <div className="miscellaneous4">Miscellaneous</div>
          </button>
          <button className="navlinks16">
            <img className="vector-icon29" alt="" src="/vector-71@2x.png" />
            <div className="about2">About</div>
          </button>
          <button className="navlinks17">
            <img className="vector-icon30" alt="" src="/vector-81@2x.png" />
            <div className="contact-us2">Contact us</div>
          </button>
          <button className="signout1">
            <div className="container20">
              <img
                className="maintenance-icon"
                loading="lazy"
                alt=""
                src="/vector-91@2x.png"
              />
              <div className="sign-out1">Sign out</div>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Drawer;
