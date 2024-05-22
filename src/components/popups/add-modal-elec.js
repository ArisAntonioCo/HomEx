import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addElectricityExpense } from "../../Redux/electricitySlice";
import "./add-modal-elec.css";


const AddModalElec = ({ close }) => {
  // Validation Function
  const validateForm = () => {
    const newErrors = {};
    if (formData.billMonth.trim() === "") {
      newErrors.billMonth = "Billing month is required";
    }
    if (formData.datePaid.trim() === "") {
      newErrors.datePaid = "Date paid is required";
    }
    if (formData.billAmount.trim() === "") {
      newErrors.billAmount = "Amount is required";
    } else if (
      isNaN(parseFloat(formData.billAmount)) ||
      parseFloat(formData.billAmount) <= 0
    ) {
      newErrors.billAmount = "Amount must be a positive number";
    }

    return Object.keys(newErrors).length === 0;
;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const isoDatePaid = new Date(formData.datePaid).toISOString();
        dispatch(addElectricityExpense({ ...formData, datePaid: isoDatePaid }));
     
      } catch (error) {
      }
    }
    close();
  };


  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    billMonth: "",
    datePaid: "",
    billAmount: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleExitClick = () => {
    close();
  };

  return (
    <div className="add-modal">

      <div className="container4">
        <form className="form">
          <div className="top-frame">
            <div className="h1">
              <div className="add-expense2">Add Expense</div>
              <div className="expense">Electricity</div>
            </div>

            <div
              className="icon"
              style={{ cursor: "pointer" }}
              tabIndex={0}
              role="button"
              aria-label="Close"
              onClick={handleExitClick}
            >
              <img className="exit-icon" alt="Close modal" src="/exit1.svg" />
            </div>
          </div>

          <div className="input-container">
            <input
              className="item"
              placeholder="Billing Month"
              type="text"
              name="billMonth" // Add the name attribute for billMonth
              value={formData.billMonth}
              onChange={handleInputChange}
            />

            <div className="date4">
              <input
                type="date"
                className="date-input"
                name="datePaid"
                value={formData.datePaid}
                onChange={handleInputChange}
                placeholder="Enter date paid"
              />
            </div>

            <input
              className="amount4"
              placeholder="Amount"
              type="number" // Input type should be "number" for billAmount
              name="billAmount"
              value={formData.billAmount}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <button className="button2" type="submit" onClick={handleSubmit}>
          <img className="add-icon" alt="" src="/addicon.svg" />
          <div className="add-expense3">Add Expense</div>
        </button>
      </div>
    </div>
  );
};

export default AddModalElec;
