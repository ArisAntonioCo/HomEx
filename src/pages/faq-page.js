import React, { useCallback, useRef } from "react";
import Navbar from "../components/navbar";
import Section from "../components/section";
import Footer from "../components/footer";
import "./faq-page.css";

const FaqPage = () => {
  const footerRef = useRef(null); // Reference to the footer for scrolling

  // Function to scroll to the footer
  const scrollToContact = useCallback(() => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="faqpage">
      <Navbar scrollToContact={scrollToContact} />
      <Section />
      <Footer ref={footerRef} bottomContentFlexWrap="wrap" />
    </div>
  );
};

export default FaqPage;
