import "./card.css";

const Card = ({ ellipse2, devName, devDesc }) => {
  return (
    <div className="card">
      <img className="card-child" loading="lazy" alt="" src={ellipse2} />
      <div className="aris-antonio-co-parent">
        <div className="aris-antonio-co">{devName}</div>
        <div className="web-developerdesigner">Web Developer/Designer</div>
      </div>
      <div className="aris-is-a">{devDesc}</div>
    </div>
  );
};

export default Card;
