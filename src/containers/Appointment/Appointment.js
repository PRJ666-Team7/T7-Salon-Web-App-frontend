import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Button, makeStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import EditAppointment from "./EditAppointment/EditAppointment";
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
  },
}));

function Appointment() {
  const [appointment, setAppointment] = useState([
    {
      name: "Wei",
      phone: "6475556661",
      service: ["Pedicure", "Wax"],
      time: "2020-10-02 11:30AM",
    },
    {
      name: "Wei",
      phone: "6475556662",
      service: ["Acrylic"],
      time: "2020-10-02 11:30AM",
    },
  ]);
  //const [appointment, setAppointment] = useState([]);
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    service: [],
    time: null,
  });

  const classes = useStyles();

  useEffect(() => {
    if (Cookies.get("user")) {
      const user = JSON.parse(Cookies.get("user"));
      if (user !== undefined && user.isEmployee) {
        async function getData() {
          const token = Cookies.get("jwt");
          var data = await axios({
            method: "GET",
            url: "http://localhost:8000/getApt",
            setTimeout: 5000,
            headers: {
              authorization: `JWT ${token}`,
            },
          });

          setAppointment(data.data);
        }
        getData();
      } else {
        window.location = "/";
      }
    } else {
      window.location = "/";
    }
  }, [appointment]);

  function onClickDelete(app) {
    let result = window.confirm(
      "Are you sure you want to remove this appointment?"
    );
    if (result) {
      const token = Cookies.get("jwt");
      axios.post(
        "http://localhost:8000/removeApt",
        { id: app.id },
        {
          headers: {
            authorization: `JWT ${token}`,
          },
        }
      );
      let newArr = appointment.filter((a) => a !== app);
      console.log(newArr);
      setAppointment([...newArr]);
    }
  }

  return (
    <Grid className={classes.mainGrid}>
      <Helmet>
        <title>Appointment</title>
      </Helmet>

      <Grid container spacing={1}>
        {appointment.map((a) => (
          <React.Fragment>
            <Grid item xs={12}>
              <Paper>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography><b>Customer Name: </b>{a.name}</Typography>

                    <Typography><b>Phone Number: </b>{a.phone}</Typography>

                    <Typography><b>Services: </b>{a.service.join(", ")}</Typography>

                    <Typography><b>Appointment Time: </b>{a.time}</Typography>
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
                          time: a.time.replace(" ", "T"),
                          id: a.id,
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
      </Grid>
    </Grid>
  );
}

export default Appointment;
