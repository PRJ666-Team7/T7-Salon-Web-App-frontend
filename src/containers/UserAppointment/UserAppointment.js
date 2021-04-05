import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Button, makeStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import ChangeAppointment from "./ChangeAppointment/ChangeAppointment";
import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles(() => ({
  mainGrid: {
    marginTop: "3vh",
    marginLeft: "20%",
    marginRight: "20%",
    flexBasis: "inherit",
  },
  Button: {
    zIndex: 2,
    width: "100%",
  },
}));

function UserAppointment() {
  const [appointment, setAppointment] = useState([
    {
      name: "Jason Jiang",
      service: ["Pedicure", "Manicure"],
      price: 35,
      date: "2020-10-02",
      startTime: "00:00:00",
      endTime: "00:00:00",
    },
    {
      name: "Wei Huang",
      service: ["Shellac Manicure"],
      price: 30,
      date: "2020-10-02",
      startTime: "00:00:00",
      endTime: "00:00:00",
    },
  ]);
  //const [appointment, setAppointment] = useState([]);
  const [editDialog, setEditDialog] = useState({ isOpen: false });
  const [price, setPrice] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    if (Cookies.get("user")) {
      const user = JSON.parse(Cookies.get("user"));
      if (user !== undefined) {
        async function getData() {
          const token = Cookies.get("jwt");
          var data = await axios({
            method: "GET",
            url: "http://localhost:8000/getUsrApt",
            setTimeout: 5000,
            headers: {
              authorization: `JWT ${token}`,
            },
          });
          //console.log(data.data)

          setAppointment(
            data.data.map((i) => {
              const sum = i.service.map((j) => {
                return parseInt(j.price, 10);
              });
              const dateName = i.date.split("T");
              return {
                name: i.name,
                service: i.service.map((i) => {
                  return i.service;
                }),
                price: sum.reduce((a, b) => a + b, 0),
                date: dateName[0],
                startTime: i.startTime,
                endTime: i.endTime,
              };
            })
          );
        }
        getData();
      } else {
        window.location = "/";
      }
    } else {
      window.location = "/";
    }
  }, [appointment, 2000]);

  return (
    <Grid className={classes.mainGrid}>
      <Helmet>
        <title>Appointment</title>
      </Helmet>
      {appointment.length > 0 ? (
        <Grid container spacing={1}>
          {appointment.map((a) => (
            <React.Fragment>
              <Grid item xs={12}>
                <Paper>
                  <Grid container>
                    <Grid item xs={11}>
                      <Typography>
                        <b>Employee Name: </b>
                        {a.name}
                      </Typography>

                      <Typography>
                        <b>Services: </b>
                        {a.service.join(", ")}
                      </Typography>

                      <Typography>
                        <b>Estimated Price: </b>${a.price}
                      </Typography>

                      <Typography>
                        <b>Appointment Time: </b>
                        {a.date} from {a.startTime} to {a.endTime}
                      </Typography>
                    </Grid>

                    <Grid item xs={1}>
                      <Button
                        className={classes.Button}
                        color="secondary"
                        onClick={() => {
                          setEditDialog({ isOpen: true });
                        }}
                      >
                        Change
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

                {editDialog.isOpen ? (
                  <ChangeAppointment
                    editDialog={editDialog}
                    setEditDialog={setEditDialog}
                  />
                ) : null}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <Grid container justify="center">
          <Grid item>
            <Paper className={classes.Paper}>
              <Typography>No Upcoming Appointments</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default UserAppointment;
