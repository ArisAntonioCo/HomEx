import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Section1 from "../components/section1";
import Footer from "../components/footer";
import "./about-page.css";

const AboutPage = () => {
  const navigate = useNavigate();

  const onLeftFrameContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="aboutpage">
      <Navbar/>
      
      <section className="section">
        <div className="textcontainer">
          <img className="icon" loading="lazy" alt="" src="/Quot.svg" />
          <h1 className="tracking-home-expenses-container">
            <span className="tracking-home-expenses">{`"Tracking home expenses isn't just about numbers; it's about `}</span>
            <b>understanding the heartbeat of your household</b>
            <span className="its-the-key">
              . It's the key to unlocking financial clarity, making informed
              decisions, and ultimately, creating a more secure future for you
              and your loved ones."
            </span>
          </h1>
        </div>
      </section>
      <Section1 />
      <Footer bottomContentFlexWrap="unset" />
    </div>
  );
};

export default AboutPage;
