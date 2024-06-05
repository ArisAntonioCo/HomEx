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
import ConfirmationDialog from "./confirmationDialogue";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../../Redux/employeeSlice";
export default function EditEmployeeModal({
  open,
  handleClose,
  employee = {},
  jobTitles,
  departments,
}) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
  const [updatedEmployee, setUpdatedEmployee] = useState(employee);
  const dispatch = useDispatch();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  useEffect(() => {
    setUpdatedEmployee(employee);
  }, [employee]);

  const handleChange = (event) => {
    setUpdatedEmployee({
      ...updatedEmployee,
      [event.target.name]: event.target.value,
    });
  };
  const validateForm = () => {
    // Check if all fields in the updatedEmployee state are filled
    for (let key in updatedEmployee) {
      if (updatedEmployee[key] === "" || updatedEmployee[key] === null) {
        setSnackbarMessage(`Please fill in the ${key} field.`);
        setSnackbarOpen(true);
        return false;
      }
    }
    return true;
  };

 const handleSubmit = () => {
  // Validate the form
  if (!validateForm()) {
    return;
  }

  // If the form is valid, open the confirmation dialog
  setConfirmDialogOpen(true);
};
const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };
const handleConfirm = () => {
  // If the user confirms, dispatch the updateEmployee action and close the dialog
  dispatch(
    updateEmployee({
      employeeId: updatedEmployee.employee_id,
      updatedData: updatedEmployee,
    })
  );
  handleClose();
  setConfirmDialogOpen(false);
};

const handleCancel = () => {
  // If the user cancels, just close the dialog
  setConfirmDialogOpen(false);
};
  return (
    <Dialog open={open} onClose={handleClose}>
        <ConfirmationDialog
      open={confirmDialogOpen}
      handleCancel={handleCancel}
      handleConfirm={handleConfirm}
      mode="edit"
      title="Confirm Edit"
    />
    <ReusableSnackbar
      open={snackbarOpen}
      handleClose={handleSnackbarClose}
      message={snackbarMessage}
      severity="error"

    />
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="first_name"
          label="First Name"
          type="text"
          value={updatedEmployee.first_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="last_name"
          label="Last Name"
          type="text"
          value={updatedEmployee.last_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          value={updatedEmployee.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="phone_number"
          label="Phone Number"
          type="tel"
          value={updatedEmployee.phone_number}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="date_of_birth"
          label="Date of Birth"
          type="date"
          value={updatedEmployee.date_of_birth}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          value={updatedEmployee.address}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="hire_date"
          label="Hire Date"
          type="date"
          value={updatedEmployee.hire_date}
          onChange={handleChange}
          fullWidth
        />
        {jobTitles && departments ? (
          <>
            <FormControl fullWidth variant="standard" margin="dense">
              <InputLabel>Job Title</InputLabel>
              <Select
                name="job_title_id"
                value={updatedEmployee.job_title_id || ""}
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
                value={updatedEmployee.department_id || ""}
                onChange={handleChange}
              >
                {departments?.departments?.length > 0 &&
                  departments.departments.map((department) => (
                    <MenuItem
                      key={department.department_id}
                      value={department.department_id}
                    >
                      {department.department_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        ) : (
          <p>Loading</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
