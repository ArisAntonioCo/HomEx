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
    navigate("/about-page");
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
              <p className="stay-on-top">For Lee Super Plaza,</p>
              <p className="home-employee">manage our employees</p>
              <p className="effortlessly">efficiently</p>
            </h1>
            <div className="effortlessly-stay-in">
            Elevate your workplace with our innovative Employee Management System! Experience a user-friendly platform designed to boost productivity and foster collaboration. Join the future of employee management today!
            </div>
            <button className="learnmore" onClick={() => window.location.href='https://www.leeplazashopping.com/lee-super-plaza.html'}>
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
