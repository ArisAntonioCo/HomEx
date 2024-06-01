import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; 
import Slide from "@mui/material/Slide"; 
function SlideTransition(props) {
  return <Slide {...props} direction="up" />; 
}

const ReusableSnackbar = ({ open, message, severity, onClose, autoHideDuration = 6000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={SlideTransition} 
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} 
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ReusableSnackbar;
