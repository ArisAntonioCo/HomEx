import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ReusableSnackbar from "./reusableSnackbar";

import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../Redux/employeeSlice";

export default function AddEmployeeModal({ onSuccess, children, jobTitles, departments }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    hire_date: "",
    job_title_id: null || "",
    department_id: null || "",
  });

 useEffect(() => {
  if (
    jobTitles?.jobTitles?.length > 0 &&
    departments?.departments?.length > 0
  ) {
    // Use the first available job title and department IDs
    setNewEmployee((prev) => ({
      ...prev,
      job_title_id: jobTitles.jobTitles[0].job_title_id,
      department_id: departments.departments[0].dept_id,
    }));
  }
}, [jobTitles, departments]); // Removed newEmployee from dependencies
const validateForm = () => {
    // Check if all fields in the newEmployee state are filled
    for (let key in newEmployee) {
      if (newEmployee[key] === "" || newEmployee[key] === null) {
        return false;
      }
    }
    return true;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date_of_birth" || name === "hire_date") {
      // Attempt to parse the date
      const date = new Date(value);

      // Check if the parsed date is valid
      if (!isNaN(date)) {
        // Format the date to YYYY-MM-DD (ISO 8601)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        setNewEmployee((prev) => ({ ...prev, [name]: `${year}-${month}-${day}` }));
      } else {
        // Handle invalid date (e.g., display an error message or clear the field)
        setNewEmployee((prev) => ({ ...prev, [name]: "" }));
        console.error("Invalid date input"); // Log the error for debugging
      }
    } else {
      // Handle other fields as usual
      setNewEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  // Assuming you have a validateForm function
  if (!validateForm()) {
    setSnackbarMessage("Please fill in all fields correctly");
    setSnackbarOpen(true);
    return;
  }

  try {
    const resultAction = await dispatch(addEmployee(newEmployee));

    // Check if adding the employee was successful
    if (addEmployee.fulfilled.match(resultAction)) {
      const successMessage = "Employee added successfully!";
      setSnackbarOpen(true);
      onSuccess(successMessage);
      handleClose();
    } else {
      // Adding the employee failed, handle the error (e.g., display an error message)
      console.error("Adding employee failed:", resultAction.error.message);
      setSnackbarOpen(true);
    }
  } catch (error) {
    setSnackbarMessage("An error occurred while adding the employee");
    setSnackbarOpen(true);
  }
};

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
        <ReusableSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity="error"
        onClose={handleSnackbarClose}
      />
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          cursor: "pointer",
          border: "1px solid transparent",
          padding: "10px 17px",
          backgroundColor: "#21167E",
          borderRadius: "12px",
          justifyContent: "center",
          gap: "10px",
          whiteSpace: "nowrap",
          "&:hover": {
            backgroundColor: "#291f84",
            borderColor: "#291f84",
          },
        }}
      >
        {children}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new employee, please fill out this form.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="first_name"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="last_name"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone_number"
            label="Phone Number"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="date_of_birth"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="hire_date"
            label="Hire Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
          {jobTitles && departments ? (
            <>
              <FormControl fullWidth variant="standard" margin="dense">
                <InputLabel>Job Title</InputLabel>
                <Select
                  name="job_title_id"
                  value={newEmployee.job_title_id || ""} // Handle null/undefined value
                  onChange={handleChange}
                >
                  {jobTitles?.jobTitles?.length > 0 &&
                    jobTitles.jobTitles.map((jobTitle) => (
                      <MenuItem
                        key={jobTitle.job_title_id}
                        value={jobTitle.job_title_id}
                      >
                        {jobTitle.job_title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="standard" margin="dense">
                <InputLabel>Department</InputLabel>
                <Select
                  name="department_id"
                  value={newEmployee.department_id || ""} // Handle null/undefined value
                  onChange={handleChange}
                >
                  {departments?.departments?.length > 0 &&
                    departments.departments.map((department) => (
                      <MenuItem
                        key={department. department_id}
                        value={department. department_id}
                      >
                        {department.department_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <p>Loading</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
