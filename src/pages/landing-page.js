import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Section2 from "../components/section2";
import Footer from "../components/footer";
import "./landing-page.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const onAboutUsTextClick = useCallback(() => {
    navigate("/aboutpage");
  }, [navigate]);

  const onLoginTextClick = useCallback(() => {
    // Please sync "Login Page" to the project
  }, []);

  const onButtonClick = useCallback(() => {
    // Please sync "Signup Page" to the project
  }, []);

  return (
    <div className="landingpage">
      <Navbar
        aboutUsHref="/aboutpage"
        onAboutUsTextClick={onAboutUsTextClick}
        fAQHref="/faqpage"
        onLoginTextClick={onLoginTextClick}
        onButtonClick={onButtonClick}
      />
      <section className="hero">
        <div className="left-content">
          <div className="text-wrapper">
            <h1 className="stay-on-top-container">
              <p className="stay-on-top">{`Stay on top of your `}</p>
              <p className="home-expenses">{`home expenses `}</p>
              <p className="effortlessly">effortlessly</p>
            </h1>
            <div className="effortlessly-stay-in">
              Effortlessly stay in control of your household finances with our
              intuitive platform, tracking every expense from electricity to
              maintenance, so you can manage your budget with ease.
            </div>
            <button className="button2">
              <div className="learn-more">Learn more</div>
            </button>
          </div>
        </div>
      </section>
      <Section2 />
      <Footer />
    </div>
  );
};

export default LandingPage;
