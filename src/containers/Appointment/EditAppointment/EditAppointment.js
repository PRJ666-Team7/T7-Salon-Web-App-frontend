import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControlLabel,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import Cookies from "js-cookie";

function EditAppointment(props) {
  const { editDialog, setEditDialog } = props;
  const [alert, setAlert] = useState(false);
  const [services, setServices] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState(editDialog.time);
  const [selectedServices, setSelectedServices] = useState([]);
  let allServices = [];
  let userServices = [];

  useEffect(() => {
    async function getData() {
      const token = Cookies.get("jwt");
      var data = await axios({
        method: "GET",
        url: "http://localhost:8000/getSrv",
        setTimeout: 5000,
        headers: {
          authorization: `JWT ${token}`,
        },
      });
      setServices(data.data);

      for (let i = 0; i < data.data.length; i++) {
        allServices.push(data.data[i]);
      }

      for (let i = 0; i < editDialog.service.length; i++) {
        for (let j = 0; j < allServices.length; j++) {
          if (editDialog.service[i] === allServices[j].srv_name) {
            userServices.push(allServices[j].srv_id);
          }
        }
      }
      setSelectedServices(userServices);
    }
    getData();
  }, []);

  const onChangeServiceCheckBox = (event, isChecked) => {
    userServices = selectedServices;
    let removed = false;

    if (isChecked) {
      //works
      if (!selectedServices.includes(parseInt(event.target.id))) {
        userServices.push(parseInt(event.target.id));
      }
    } else {
      //doesnt work, cant get rid of initial values
      for (let i = 0; i < userServices.length && !removed; i++) {
        if (userServices[i] === parseInt(event.target.id)) {
          userServices.splice(i, 1);
          removed = true;
        }
      }
    }
    setSelectedServices(userServices);
    console.log(selectedServices);
  };

  const handleUpdate = () => {
    if (selectedServices.length == 0) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      console.log()
      const date = appointmentTime.split("T")[0];
      const time = appointmentTime.split("T")[1];
      const token = Cookies.get("jwt");
      axios.post("http://localhost:8000/editApt", {
        id: editDialog.id,
        date: date,
        time: time,
        services: selectedServices,
      },
      {
        headers: {
          authorization: `JWT ${token}`,
        },
      });
      console.log(
        `id: ${editDialog.id}, date: ${date}, time: ${time}, services: ${selectedServices}`
      );
      setEditDialog({ ...editDialog, isOpen: false });
    }
  };

  const handleClose = () => {
    setEditDialog({ ...editDialog, isOpen: false });
  };

  function defaultCheck(s) {
    for (let i = 0; i < editDialog.service.length; i++) {
      if (editDialog.service[i] === s) return true;
    }
  }

  return (
    <Dialog open={editDialog.isOpen} onClose={handleClose}>
      <DialogTitle>{editDialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{editDialog.subTitle}</DialogContentText>
        <br />
        <FormLabel>Services</FormLabel>
        {alert ? (
          <Alert severity="error" color="info">
            {" "}
            At least one service is required{" "}
          </Alert>
        ) : null}
        <FormGroup row>
          {services.map((s) => (
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={defaultCheck(s.srv_name)}
                  name={s.srv_name}
                  id={s.srv_id}
                  onChange={onChangeServiceCheckBox}
                />
              }
              label={s.srv_name}
            />
          ))}
        </FormGroup>

        <br />

        <TextField
          fullWidth
          id="time"
          label="Time"
          type="datetime-local"
          defaultValue={editDialog.time}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={(e) => setAppointmentTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAppointment;
