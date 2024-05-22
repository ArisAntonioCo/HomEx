import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateElectricityExpense } from "../../Redux/electricitySlice";
import "./edit-modal-elec.css";

const EditModalElec = ({ close, expense }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    billMonth: expense.billMonth,
    datePaid: expense.datePaid,
    billAmount: expense.billAmount,
    expenseId: expense.expensesId,
    // Add other properties of expense here if needed
  });

  console.log(formData);
  const [errors, setErrors] = useState({});

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if form is valid
  };

  useEffect(() => {
  if (
    expense &&
    expense.datePaid &&
    typeof expense.datePaid.seconds === "number"
  ) {
    const date = new Date(expense.datePaid.seconds * 1000);
    date.setHours(12, 0, 0, 0);
    const formattedDate = date.toISOString().split("T")[0];
    setFormData({
      ...expense,
      datePaid: formattedDate,
    });
  }
}, [expense]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Convert datePaid to ISO 8601 format before sending to backend
      const isoDatePaid = new Date(formData.datePaid).toISOString();
      dispatch(
        updateElectricityExpense({
          expenseId: formData.expenseId,
          updatedData: {
            billMonth: formData.billMonth,
            datePaid: isoDatePaid,
            billAmount: formData.billAmount,
          },
        })
      );
      close(); // Close the modal after submission
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleExitClick = () => {
    close(); // Call the close function passed from ElectricityPage
  };

  return (
    <div className="add-modal">
      <div className="container4">
        <form className="form" onSubmit={handleSubmit}>
          {/* Top-frame */}
          <div className="top-frame">
            <div className="h1">
              <div className="add-expense2">Edit Expense</div>
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

          {/* Input Container */}
          <div className="input-container">
            <input
              className="item"
              placeholder="Billing Month"
              type="text"
              name="billMonth"
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
              type="number"
              name="billAmount"
              value={formData.billAmount}
              onChange={handleInputChange}
            />
            {errors.billAmount && (
              <div className="error-message">{errors.billAmount}</div>
            )}
          </div>

          {/* Error Display */}
          {Object.keys(errors).length > 0 && (
            <div className="error-message">
              {Object.values(errors).map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          )}

          <button className="button2" type="submit">
            <img className="add-icon" alt="" src="/addicon.svg" />
            <div className="add-expense3">Save Changes</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModalElec;
