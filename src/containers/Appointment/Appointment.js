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
      url: "http://localhost:8000/getApt",
      setTimeout: 5000,
      headers: {
        authorization: `JWT ${token}`,
      },
    });

    setAppointment(data.data);
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
        "http://localhost:8000/removeApt",
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

      <Grid container spacing={1}>
        {appointment.map((a) => (
          <React.Fragment>
            <Grid item xs={12}>
              <Paper>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography>{a.name}</Typography>

                    <Typography>{a.phone}</Typography>

                    <Typography>{a.service.join(", ")}</Typography>

                    <Typography>{a.time}</Typography>
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
