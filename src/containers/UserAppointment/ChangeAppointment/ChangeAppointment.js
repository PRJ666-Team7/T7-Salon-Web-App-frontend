import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
function ChangeAppointment(props) {
  const { editDialog, setEditDialog } = props;

  const handleClose = () => {
    setEditDialog({ ...editDialog, isOpen: false });
  };

  return (
    <Dialog open={editDialog.isOpen} onClose={handleClose}>
      <DialogTitle><PhoneIcon/> Modify the Appointment</DialogTitle>
      <DialogContent>
        <DialogContentText>To make any changes or cancel to the appointment, please contact us at: <b>(647) 346-9288</b> and speak to an employee.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeAppointment;
