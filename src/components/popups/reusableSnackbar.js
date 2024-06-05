import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; // Use Alert instead of MuiAlert for MUI v5
import Slide from "@mui/material/Slide"; // For slide transition effect

function SlideTransition(props) {
  return <Slide {...props} direction="up" />; // Slide up animation
}

const ReusableSnackbar = ({ open, message, severity, onClose, autoHideDuration = 6000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={SlideTransition} // Add transition effect
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Center the snackbar
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ReusableSnackbar;
