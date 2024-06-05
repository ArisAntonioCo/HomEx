import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFoodExpense } from "../../Redux/foodSlice";
import "./add-modal-food.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AddModalElec = ({ close, onSuccess }) => {
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (message && !hasShown) {
      setOpen(true);
      setHasShown(true);
    }
  }, [message, hasShown]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    billMonth: "",
    datePaid: "",
    billAmount: "",
  });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      setMessage("Please fill in all fields correctly");
      return;
    }
  
    try {
      const isoDatePaid = new Date(formData.datePaid).toISOString();
      const resultAction = await dispatch(
        addFoodExpense({ ...formData, datePaid: isoDatePaid })
      );
  
      // Check if adding the expense was successful
      if (addFoodExpense.fulfilled.match(resultAction)) {
        const successMessage = "Food expense added successfully!";
        setMessage(successMessage);
        onSuccess(successMessage); // Call the onSuccess callback
        close();
      } else {
        // Adding the expense failed, handle the error (e.g., display an error message)
        console.error("Adding expense failed:", resultAction.error.message);
        setMessage("Failed to add electricity expense");
      }
    } catch (error) {
      setMessage("An error occurred while adding the expense");
    }
  };

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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="error"
          elevation={6}
          variant="filled"
        >
          {message}
        </MuiAlert>
      </Snackbar>
      <div className="container4">
        <form className="form">
          <div className="top-frame">
            <div className="h1">
              <div className="add-expense2">Add Expense</div>
              <div className="expense">Food</div>
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
