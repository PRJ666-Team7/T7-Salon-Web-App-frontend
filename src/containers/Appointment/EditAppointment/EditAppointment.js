import React, { useEffect, useState } from "react";
import {
  Grid,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import Cookies from "js-cookie";

function EditAppointment(props) {
  const { editDialog, setEditDialog } = props;
  const [alert, setAlert] = useState(false);
  const [services, setServices] = useState([]);
  //const [appointmentTime, setAppointmentTime] = useState(editDialog.time);
  const [selectedServices, setSelectedServices] = useState([]);
  const [empSchedule, setEmpSchedule] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [date, setDate] = useState("");
  const [newAptId, setNewAptId] = useState(null);

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

      var empScheduleRequest = await axios({
        method: "GET",
        url: "http://localhost:8000/getEmpTime",
        setTimeout: 5000,
        headers: {
          authorization: `JWT ${token}`,
        },
      });
      setEmpSchedule(empScheduleRequest.data);

      let date = new Set();
      for(let i = 0; i < empScheduleRequest.data.length; i++){
        date.add(empScheduleRequest.data[i].date)
      }
      setDateList(Array.from(date));

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

  async function handleUpdate(){
    if (selectedServices.length == 0) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      const token = Cookies.get("jwt");
      await axios.post("http://localhost:8000/editApt", {curId: editDialog.id, id: newAptId, userId: editDialog.usr_id, srvId: selectedServices},
      {
        headers: {
          authorization: `JWT ${token}`,
        },
      });
      setEditDialog({ ...editDialog, isOpen: false });
    }
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value.split('T')[0]);
    console.log(date)
    let time = [];
    empSchedule.map(es=> {
      if(es.date == e.target.value){
        time.push({aptId: es.id, aptTime: es.time_start + ' to ' + es.time_end});
      }
      console.log(time);
    })
    setTimeList(time);
  }

  const handleChangeTime = (e) =>{
    setNewAptId(e.target.value)
  }

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

        <Grid item xs={12}>
              <TextField
                id="date"
                fullWidth
                select
                label="Date"
                //value={date}
                onChange={handleChangeDate}
                helperText="Please select an available date"
                variant="filled"
              >
                {dateList.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.split('T')[0]}
                  </MenuItem>
                ))}
              </TextField>
          </Grid>

          <Grid item xs={12}>
              <TextField
                id="time"
                fullWidth
                select
                label="Time"
                //value={date}
                onChange={handleChangeTime}
                helperText="Please select an available time"
                variant="filled"
                disabled={date==""}
              >
                {timeList.map((option) => (
                  <MenuItem key={option.aptId} value={option.aptId}>
                    {option.aptTime}
                  </MenuItem>
                ))}
              </TextField>
          </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdate} color="primary" disabled={newAptId == null? true : false}>
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