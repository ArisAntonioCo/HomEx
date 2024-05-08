import { useCallback } from "react";
import Navbar from "../components/navbar";
import Section from "../components/section";
import Footer from "../components/footer";
import "./faq-page.css";

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
