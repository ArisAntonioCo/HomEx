import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../Redux/employeeSlice";
import "./add-modal-elec.css";
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

  const validateForm = () => {
    const newErrors = {};
    if (formData.billMonth.trim() === "") {
      newErrors.billMonth = "Billing month is required";
    }
    if (formData.datePaid.trim() === "") {
      console.log( formData.datePaid);
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
      addEmployee({ ...formData, datePaid: isoDatePaid })
    );

    // Check if adding the  was successful
    if (addEmployee.fulfilled.match(resultAction)) {
      const successMessage = "Employee added successfully!";
      setMessage(successMessage);
      setMessage("Employee added successfully!");
      onSuccess(successMessage); // Call the onSuccess callback
      close();
    } else {
      // Adding the  failed, handle the error (e.g., display an error message)
      console.error("Adding failed:", resultAction.error.message);
      setMessage("Failed to add employee");
    }
  } catch (error) {
    setMessage("An error occurred while adding the employee");
  }
};

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    birthdate: '',
    address: '',
    deptId: '',
    jobId: '',
    hireDate: '',
    salary: '',
    phone: '',
    email: '',
    addedBy: ''
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
              <div className="add-2">Add Expense</div>
              <div className="">Employee</div>
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
              placeholder="First Name"
              type="text"
              name="billMonth" 
              value={formData.f_name}
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
          </div>
        </form>
        <button className="button2" type="submit" onClick={handleSubmit}>
          <img className="add-icon" alt="" src="/addicon.svg" />
          <div className="add-3">Add Employee</div>
        </button>
      </div>
    </div>
  );
};

export default AddModalElec;
