import React from 'react';
import "./edit-modal-water.css";

const EditModalWater = ({ close }) => { // `close` prop to handle closing of the modal
  return (
    <div className="edit-modal">
      <div className="container5">
        <form className="form1">
          <header className="top-frame1">
            <div className="h11">
              <h1 className="add-expense4">Edit Expense</h1>
              <h2 className="expense1">Expense</h2>
            </div>
            <div className="icon1" style={{ cursor: 'pointer' }} tabIndex={0} role="button" aria-label="Close" onClick={close}>
              <img className="exit-icon1" alt="Close modal" src="/exit@2x.png" />
            </div>
          </header>
          <div className="input-container1">
            <input
              className="item1"
              placeholder="Service Provider"
              type="text"
            />
            <div className="date5">
              {/* Date input possibly here */}
            </div>
            <input className="amount5" placeholder="Amount" type="text" />
          </div>
        </form>
        <button className="button3">
          <img className="vector-icon3" alt="" src="/addicon.svg" />
          <div className="add-expense5">Add Expense</div>
        </button>
      </div>
    </div>
  );
};

export default EditModalWater;
