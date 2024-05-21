// Footer.js
import { useMemo, forwardRef } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = forwardRef(({ bottomContentFlexWrap }, ref) => {
  const bottomContentStyle = useMemo(() => {
    return {
      flexWrap: bottomContentFlexWrap,
    };
  }, [bottomContentFlexWrap]);

  return (
    <footer className="footer" ref={ref}>
      <div className="container25">
        <div className="top-content4">
          <div className="logo2">
            <img
              className="logo-icon2"
              loading="lazy"
              alt=""
              src="/logo1.svg"
            />
            <div className="our-platforms-intuitive-container1">
              <p className="our-platforms-intuitive1">
                Our platform's intuitive tabs for electricity, food, water,
                miscellaneous, and maintenance streamline expense tracking.
                Easily navigate through
              </p>
              <p className="modules-to-monitor1">
                modules to monitor every aspect of your household spending,
                ensuring you stay in control effortlessly.
              </p>
            </div>
          </div>

          <div className="navigation">
            <h3 className="navigation1">Navigation</h3>
            <div className="nav">
              <Link className="about-us2" to="/about-page"> About us</Link>
              <Link className="contact1" to="/"> Contact</Link>
              <Link className="faq1" to="/faq-page"> FAQ</Link>
            </div>
          </div>

          <div className="contact2">
            <h3 className="contact-us1">Contact Us</h3>
            <div className="content">
              <div className="div">+93 929 743 7986</div>
              <div className="div1">+93 929 743 7986</div>
              <div className="div2">+93 929 743 7986</div>
              <div className="emailgmailcom">email@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="bottom-content4" style={bottomContentStyle}>
          <div className="copyright1">
            Copyright©2024 Co, Faburada, Nato All Rights Reserved
          </div>
          <div className="silliman-university">
            <div className="silliman-university1">Silliman University</div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
