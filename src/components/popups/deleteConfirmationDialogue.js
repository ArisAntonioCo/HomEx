import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteConfirmationDialog = ({
  open,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancelDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialogTitle-root": {
          fontSize: "var(--font-size-5xl)",
          fontWeight: 800,
          fontFamily: "var(--font-inter)",
          color: "var(--color-darkslategray-100)",
          textAlign: "left",
        },
        "& .MuiDialogContent-root": {
          fontSize: "var(--font-size-xs)",
          fontWeight: 300,
          fontFamily: "var(--font-inter)",
          color: "var(--color-gray)",
        },
        "& .MuiDialogActions-root": {
          justifyContent: "space-between",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontFamily: "var(--font-inter)" }}
      >
        {"Delete Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontFamily: "var(--font-inter)" }}
        >
          Are you sure you want to delete this expense?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancelDelete}
          sx={{
            fontWeight: 500,
            fontSize: "var(--font-size-2xs)",
            color: "white",
            fontFamily: "var(--font-inter)",
            backgroundColor: "darkslategray",
            marginRight: 1
          }}
        >
          No
        </Button>
        <Button
          onClick={handleConfirmDelete}
          autoFocus
          sx={{
            fontWeight: 500,
            fontSize: "var(--font-size-2xs)",
            color: "white",
            fontFamily: "var(--font-inter)",
            backgroundColor: "#ff5e24",
            marginLeft: 1
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
