import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Section2 from '../components/section2';
import Footer from '../components/footer';
import './landing-page.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);  // Reference for the footer component

  // Function to scroll to the footer section smoothly
  const scrollToContact = useCallback(() => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Function to handle click for "About Us" navigation
  const onAboutUsTextClick = useCallback(() => {
    navigate("/aboutpage");
  }, [navigate]);

  // Functions for potential login and signup interactions
  const onLoginTextClick = useCallback(() => {
    navigate("/login-page");
  }, [navigate]);

  const onButtonClick = useCallback(() => {
    navigate("/signup-page");
  }, [navigate]);

  return (
    <div className="landingpage">
      <Navbar
        scrollToContact={scrollToContact}
        onAboutUsTextClick={onAboutUsTextClick}
        onLoginTextClick={onLoginTextClick}
        onButtonClick={onButtonClick}
      />
      <section className="hero">
        <div className="left-content">
          <div className="text-wrapper">
            <h1 className="stay-on-top-container">
              <p className="stay-on-top">Stay on top of your</p>
              <p className="home-expenses">home expenses</p>
              <p className="effortlessly">effortlessly</p>
            </h1>
            <div className="effortlessly-stay-in">
              Effortlessly stay in control of your household finances with our
              intuitive platform, tracking every expense from electricity to
              maintenance, so you can manage your budget with ease.
            </div>
            <button className="learnmore">
              <div className="learn-more">Learn more</div>
            </button>
          </div>
        </div>
      </section>
      <Section2 />
      <Footer ref={footerRef} />
    </div>
  );
};

export default LandingPage;
