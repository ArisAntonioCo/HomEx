import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMiscellaneousExpense } from "../../Redux/miscSlice";
import "./edit-modal-misc.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EditModalMisc = ({ close, onSuccess, expense }) => {
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

  if (!validateForm()) {
    setMessage("Please fill in all fields correctly");
    return;
  }

  try {
    const isoDatePaid = new Date(formData.datePaid).toISOString();
    const resultAction = await dispatch(
      updateMiscellaneousExpense({
        expenseId: formData.expenseId,
        updatedData: {
          billMonth: formData.billMonth,
          datePaid: isoDatePaid,
          billAmount: formData.billAmount,
        },
      })
    );

    // Check if updating the expense was successful
    if (updateMiscellaneousExpense.fulfilled.match(resultAction)) { 
      // Correctly check against updateMiscellaneousExpense
      const successMessage = "Miscellaneous expense edited successfully!";
      setMessage(successMessage);
      onSuccess(successMessage); // Call the onSuccess callback
      close();
    } else {
      console.error("Updating expense failed:", resultAction.error.message);
      setMessage("Failed to edit misc expense. Please try again."); // More specific error message
    }
  } catch (error) {
    setMessage("An error occurred while editing the expense.");
  }
};

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleExitClick = () => {
    close(); // Call the close function passed from MiscellaneousPage
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
        <form className="form" onSubmit={handleSubmit}>
          {/* Top-frame */}
          <div className="top-frame">
            <div className="h1">
              <div className="add-expense2">Edit Expense</div>
              <div className="expense">Miscellaneous</div>
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

export default EditModalMisc;
