import React, { useState } from 'react';
import "./add-modal-water.css";

const AddModalWater = ({ close }) => {
  const [date, setDate] = useState('');
  
  const formatDate = (isoDateString) => {
    if (!isoDateString) return '';
    const dateObj = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
  };

  const handleExitClick = () => {
    close(); // Calls the function passed as a prop to close the modal
  };

  return (
    <div className="add-modal">
      <div className="container4">
        <form className="form">
          <div className="top-frame">
            <div className="h1">
              <div className="add-expense2">Add Expense</div>
              <div className="expense">Expense</div>
            </div>
            <div className="icon" style={{ cursor: 'pointer' }} tabIndex={0} role="button" aria-label="Close" onClick={handleExitClick}>
              <img className="exit-icon" alt="Close modal" src="/exit1.svg" />
            </div>
          </div>
          <div className="input-container">
            <input className="item" placeholder="Service Provider" type="text" />
            <div className="date4">
              <input type="date" onChange={handleDateChange} className="date-input" />
            </div>
            <input className="amount4" placeholder="Amount" type="text" />
          </div>
        </form>
        <button className="button2">
          <img className="add-icon" alt="" src="/addicon.svg" />
          <div className="add-expense3">Add Expense</div>
        </button>
      </div>
    </div>
  );
};

export default AddModalWater;
