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
              src="/leeplaza1.png"
            /> <br/>
            <div className="our-platforms-intuitive-container1">
              <p className="our-platforms-intuitive1">
              Our platform's intuitive tabs streamline employee records management, offering a seamless way to organize and access all necessary information. With user-friendly navigation, you can effortlessly track and manage every aspect of your workforce. 
              </p>
              <p className="modules-to-monitor1">
              Simplify your administrative tasks and enhance productivity with our comprehensive employee records management solution.
              </p>
            </div>
          </div>

          <div className="navigation">
            <h3 className="navigation1">Address</h3>
            <div className="nav">
            Perdices Corner, San Jose St. <br />
Dumaguete City, 6200
Negros Oriental, Philippines
            </div>
          </div>

          <div className="contact2">
            <h3 className="contact-us1">Contact Us</h3> <br/>
            <div className="content">
            <div className="div4"> <b>Mobile</b> </div>
              <div className="div">+93 976 166 9274 </div>
              <div className="div1">+93 956 557 7370</div>
              <div className="div2">+93 929 743 7986</div> <br/>
              <div className="div5"><b>Email</b> </div>
              <div className="emailgmailcom">ccsLeePlaza@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="bottom-content4" style={bottomContentStyle}>
          <div className="copyright1">
            Copyright©2024 Co, Faburada, Nato, Aguel, Baco. All Rights Reserved
          </div>
          <div className="silliman-university">
            <div className="silliman-university1">School Project Purposes Only.</div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
