import { useCallback } from "react";
import Navbar from "../components/navbar";
import Section from "../components/PrivacySection";
import Footer from "../components/footer";
import "./privacy-page.css";

const FaqPage = () => {
  return (
    <div className="faqpage">
      <Navbar/>
      <Section />
      <Footer bottomContentFlexWrap="wrap" />
    </div>
  );
};

export default FaqPage;
