import React, { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Section1 from "../components/section1";
import Footer from "../components/footer";
import "./about-page.css";

const AboutPage = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null); // Reference to the footer for scrolling

  // Function to handle click on navbar logo or anywhere you need to go to home
  const onLeftFrameContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Function to scroll to the footer
  const scrollToContact = useCallback(() => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="aboutpage">
      <Navbar scrollToContact={scrollToContact} />
      
      <section className="section">
        <div className="textcontainer">
          <img className="icon" loading="lazy" alt="" src="/Quot.svg" />
          <h1 className="tracking-home-expenses-container">
            <span className="tracking-home-expenses">"Tracking home expenses isn't just about numbers; it's about </span>
            <b>understanding the heartbeat of your household</b>
            <span className="its-the-key">
              . It's the key to unlocking financial clarity, making informed
              decisions, and ultimately, creating a more secure future for you
              and your loved ones."
            </span>
          </h1>
        </div>
      </section>
      
      {/* New section for the YouTube video */}
      <section className="video-section">
        <div className="video-container">
          <iframe
            width="860"
            height="485"
            src="https://www.youtube.com/embed/vHlsSp4blVw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <Section1 />
      <Footer ref={footerRef} bottomContentFlexWrap="unset" />
    </div>
  );
};

export default AboutPage;