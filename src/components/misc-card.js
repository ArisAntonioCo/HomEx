import "./misc-card.css";

const MiscCard = () => {
  return (
    <div className="misccard1">
      <div className="label11">
        <img
          className="miscicon1"
          loading="lazy"
          alt=""
          src="/miscicon1@2x.png"
        />
        <h1 className="miscellaneous7">Miscellaneous</h1>
        <button className="total20">
          <div className="total21">Total $</div>
        </button>
      </div>
      <div className="misctotal1">$999</div>
    </div>
  );
};

export default MiscCard;
