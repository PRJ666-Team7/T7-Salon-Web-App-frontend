import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Helmet } from "react-helmet";
import axios from "axios";
import EditService from "./EditService/EditService";
import Cookies from "js-cookie";

const useStyles = makeStyles(() => ({
  mainGrid: {
    marginTop: "3vh",
    marginLeft: "25%",
    marginRight: "25%",
    flexBasis: "inherit",
  },
  addButton: {
    marginTop: "2%",
    marginBottom: "2%",
    width: "100%",
    fontSize: "inhereit",
    color: "green",
  },
  Button: {
    zIndex: 2,
  },
}));

function Service() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ sName: null, sPrice: null });
  const [alert, setAlert] = useState({ show: false, msg: null });
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    id: 0,
    name: "",
    price: 0,
  });

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
  }

  const classes = useStyles();
  useEffect(() => {
    if (Cookies.get("user")) {
      const user = JSON.parse(Cookies.get("user"));
      if (user !== undefined && user.isAdmin) {
        getData();
      } else {
        window.location = "/";
      }
    } else {
      window.location = "/";
    }
  }, [editDialog]);

  const handleChangeSrvName = (e) => {
    if (e.target.value !== "") {
      setNewService({ ...newService, sName: e.target.value });
    } else {
      setNewService({ ...newService, sName: null });
    }
  };

  const handleChangeSrvPrice = (e) => {
    if (e.target.value !== "") {
      setNewService({ ...newService, sPrice: parseFloat(e.target.value) });
    } else {
      setNewService({ ...newService, sPrice: null });
    }
  };

  const handleAddService = () => {
    let existingService = false;
    for (let i = 0; i < services.length; i++) {
      if (newService.sName) {
        if (services[i].srv_name == newService.sName.toUpperCase())
          existingService = true;
      }
    }

    if (existingService) {
      setAlert({ show: true, msg: "Existing Service" });
      setTimeout(() => {
        setAlert({ show: false, msg: null });
      }, 3000);
    } else if (newService.sName == null || newService.sPrice == null) {
      setAlert({ show: true, msg: "Missing Info" });
      setTimeout(() => {
        setAlert({ show: false, msg: null });
      }, 3000);
    } else {
      console.log(newService);
      const token = Cookies.get("jwt");
      axios.post(
        "http://localhost:8000/addSrv",
        { name: newService.sName.toUpperCase(), price: newService.sPrice },
        {
          headers: {
            authorization: `JWT ${token}`,
          },
        }
      ).then(getData());
    }
  };

  const handleDelete = (s) => {
    let result = window.confirm(
      "Are you sure you want to remove this service?"
    );

    if (result) {
      const token = Cookies.get("jwt");
      axios.post(
        "http://localhost:8000/removeSrv",
        { id: s.srv_id },
        {
          headers: {
            authorization: `JWT ${token}`,
          },
        }
      ).then(getData());
    }
  };

  return (
    <Grid className={classes.mainGrid}>
      <Helmet>
        <title>Service</title>
      </Helmet>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TextField
            placeholder="Service Name"
            onChange={handleChangeSrvName}
          ></TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            placeholder="Service Price"
            type="number"
            onChange={handleChangeSrvPrice}
          ></TextField>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            className={classes.addButton}
            onClick={handleAddService}
          >
            + Add Service
          </Button>
        </Grid>
        {alert.show ? (
          <Grid item xs={3}>
            <Alert severity="error" color="info">
              {" "}
              {alert.msg}{" "}
            </Alert>
          </Grid>
        ) : null}

        {services.map((s) => (
          <React.Fragment>
            <Grid item xs={12}>
              <Paper>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography>{s.srv_name}</Typography>

                    <Typography>Price: ${s.srv_price}</Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Button
                      color="secondary"
                      onClick={() => {
                        handleDelete(s);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        setEditDialog({
                          isOpen: true,
                          title: "Edit Service",
                          subTitle: `Edit the ${s.srv_name} Service`,
                          id: s.srv_id,
                          name: s.srv_name,
                          price: s.srv_price,
                        });
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>

              {editDialog.isOpen ? (
                <EditService
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

export default Service;