import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Button, makeStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import EditAppointment from "./EditAppointment/EditAppointment";
import axios from "axios";
import Cookies from "js-cookie";
import Config from '../../components/helpers/Config'

const useStyles = makeStyles(() => ({
  mainGrid: {
    marginTop: "3vh",
    marginLeft: "20%",
    marginRight: "20%",
    flexBasis: "inherit",
  },
  Button: {
    zIndex: 2,
  },
  Paper: {
    background: "#dae8fc"
  },
}));

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    service: [],
    time: null,
  });

  async function getData() {
    const token = Cookies.get("jwt");
    var data = await axios({
      method: "GET",
      url: Config.api + "/getApt",
      setTimeout: 5000,
      headers: {
        authorization: `JWT ${token}`,
      },
    })
    .then(data => {
      const appointments = data.data.map(a =>{
        return {
          id: a.id,
          name: a.name,
          phone: a.phone,
          service: a.service,
          date: a.date.split('T')[0],
          time_start: a.time_start,
          time_end: a.time_end,
          usr_id: a.usr_id
        }
      })
      setAppointment(appointments);
      console.log(appointments)
    })
  }

  const classes = useStyles();

  useEffect(() => {
    if (Cookies.get("user")) {
      const user = JSON.parse(Cookies.get("user"));
      if (user !== undefined && user.isEmployee) {
        getData();
      } else {
        window.location = "/";
      }
    } else {
      window.location = "/";
    }
  }, [editDialog]);

  function onClickDelete(app) {
    let result = window.confirm(
      "Are you sure you want to remove this appointment?"
    );
    if (result) {
      const token = Cookies.get("jwt");
      axios.post(
        Config.api + "/removeApt",
        { id: app.id },
        {
          headers: {
            authorization: `JWT ${token}`,
          },
        }
      ).then(getData());
    }
  }

  return (
    <Grid className={classes.mainGrid}>
      <Helmet>
        <title>Appointment</title>
      </Helmet>
      {appointment.length > 0? (
        <Grid container spacing={1}>
          {appointment.map((a) => (
            <React.Fragment>
              <Grid item xs={12}>
                <Paper>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Customer Name: {a.name}</Typography>

                      <Typography>Customer Phone: {a.phone}</Typography>

                      <Typography>Services: {a.service.join(", ")}</Typography>

                      <Typography>Date: {a.date}</Typography>

                      <Typography>From: {a.time_start} to {a.time_end}</Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Button
                        color="secondary"
                        onClick={() => {
                          onClickDelete(a);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => {
                          setEditDialog({
                            isOpen: true,
                            title: "Edit Appointment",
                            subTitle: `Edit ${a.name}'s appointment, phone number: ${a.phone}`,
                            service: a.service,
                            id: a.id,
                            usr_id: a.usr_id
                          });
                        }}
                      >
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                {editDialog.isOpen ? (
                  <EditAppointment
                    editDialog={editDialog}
                    setEditDialog={setEditDialog}
                  />
                ) : null}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>)
        :
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.Paper}>
              <Typography>
                No Upcoming Appointments
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      }
    </Grid>
  );
}

export default Appointment;