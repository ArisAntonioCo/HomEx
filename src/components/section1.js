import Card from "./card";
import "./section1.css";

const Section1 = () => {
  return (
    <section className="section2">
      <div className="textcontainer1">
        <div className="heading5">
          <h1 className="about-us">About us</h1>
          <div className="the-team-of">The team of three</div>
        </div>
        <div className="welcome-to-homeex-container">
          <span>Welcome to HomeEx, where we're</span>
          <b> revolutionizing home expense management.</b>
          <span> Our dedicated team, including developers</span>
          <b> Aris Co, Rodjemel Faburada, and Jan Dominic Nato</b>
          <span>
            , crafted an intuitive platform for effortless tracking of
            electricity bills, groceries, and maintenance costs. Take control of
            your finances and find peace of mind with HomeEx.
          </span>
        </div>
      </div>
      <div className="wrapper1">
        <Card
          ellipse2="/ellipse-2@2x.png"
          devName="Aris Antonio Co"
          devDesc="Aris is a remarkable developer with an innate talent for crafting seamless user experiences and intuitive interfaces."
        />
        <Card
          ellipse2="/ellipse-2-1@2x.png"
          devName="Rodjemel Faburada"
          devDesc="Rodjemel shines as a coding virtuoso, effortlessly translating complex ideas into elegant solutions."
        />
        <Card
          ellipse2="/ellipse-2-2@2x.png"
          devName="Jan Dominic Nato"
          devDesc="Dominic is a coding maestro, adept at harmonizing functionality and aesthetics to elevate user interactions."
        />
      </div>
    </section>
  );
};

export default Section1;
