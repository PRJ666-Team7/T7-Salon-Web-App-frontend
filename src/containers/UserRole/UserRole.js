import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Helmet } from "react-helmet";
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
  userPaper: {
    marginTop: "2vh",
  },
  Paper: {
    background: "#dae8fc"
  },
}));

function UserRole() {
  const classes = useStyles();
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState([]);

  if (Cookies.get("user")) {
    const user = JSON.parse(Cookies.get("user"));
    if (user == undefined || !user.isAdmin) window.location = "/";
  } else {
    window.location = "/";
  }

  async function handleSearch() {
    if (email == "") {
      setUser(null);
    } else {
      const token = Cookies.get("jwt");
      var data = await axios({
        method: "GET",
        url: "http://localhost:8000/getUsrInfo?term=" + email,
        setTimeout: 5000,
        headers: {
          authorization: `JWT ${token}`,
        },
      });
      if(data.data.length > 0)
                setUser(data.data);
            else
                setUser(null);
      //console.log(user);
    }
  }

  const handleClickAdmin = (userId) => {
    const token = Cookies.get("jwt");
    axios.post(
      "http://localhost:8000/setAdmin",
      { id: userId },
      {
        headers: {
          authorization: `JWT ${token}`,
        },
      }
    );
    setUser(
      [...user],
      (user[user.findIndex((u) => u.usr_id == userId)].admin = !user[
        user.findIndex((u) => u.usr_id == userId)
      ].admin)
    );
  };

  async function handleClickEmployee(userId, empName) {
    const token = Cookies.get("jwt");
    const empIdRequest = await axios({
      method: "GET",
      url: "http://localhost:8000/getEmpId?id=" + userId,
      setTimeout: 5000,
      headers: {
        authorization: `JWT ${token}`,
      },
    });

    let empId = empIdRequest.data.emp_id;
    
    console.log(empId)

    if (empId) {
      var appointmentsRequest = await axios({
        method: "GET",
        url: "http://localhost:8000/getEmpApt?id=" + empId,
        setTimeout: 5000,
        headers: {
          authorization: `JWT ${token}`,
        },
      });
      let appointments = appointmentsRequest.data;
      let upcomingAppointments = appointments.filter((a) => {
        return new Date(a.apt_date).getTime() >= new Date().getTime();
      });
      if (upcomingAppointments.length > 0) {
        window.alert("Employee is still scheduled for work");
      } else {
        let confirmation = window.confirm(
          "Are you sure you want to revoke employee role from " + empName
        );
        if (confirmation) {
          axios.post(
            "http://localhost:8000/setEmployee",
            { id: userId, employee: false },
            {
              headers: {
                authorization: `JWT ${token}`,
              },
            }
          );
          setUser(
            [...user],
            (user[user.findIndex((u) => u.usr_id == userId)].employee = "0")
          );
        }
      }
    } else {
      axios.post(
        "http://localhost:8000/setEmployee",
        { id: userId, employee: true },
        {
          headers: {
            authorization: `JWT ${token}`,
          },
        }
      );
      setUser(
        [...user],
        (user[user.findIndex((u) => u.usr_id == userId)].employee = "1")
      );
    }
  }

  return (
    <Grid className={classes.mainGrid}>
        <Helmet>
            <title>User Roles</title>
        </Helmet>
        <Grid container spacing={1} justify="center" alignItems="flex-end">
            <Grid item>
                <AccountCircle />
            </Grid>
            <Grid item spacing>
                <TextField label="Enter an user email" onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item>
                <Button onClick={handleSearch}>
                    Search
                </Button>
            </Grid>
            {user != null ? (
                user.map((u)=> (
                <Grid item xs={12} className={classes.userPaper}>
                    <Paper>
                        <Grid container>
                            <Grid item xs={8} spacing={1}>
                                <Typography>
                                    {u.name}
                                </Typography>
                                <Typography>
                                    {u.email}
                                </Typography>
                                <Typography>
                                    Employee Status: {u.employee == 1? "Employee" : "Not Employee"}
                                </Typography>
                                <Typography>
                                    Admin Status: {u.admin ? "Admin" : "Not Admin"}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button color={u.employee == 0? "primary" : "secondary"} onClick={()=>handleClickEmployee(u.usr_id, u.employee, u.name)} >
                                    {u.employee == 0? "Set Employee" : "Revoke Employee"}
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button color={u.admin ? "secondary" : "primary"} onClick={()=>handleClickAdmin(u.usr_id)} >
                                    {u.admin ? "Revoke Admin" : "Set Admin"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                )))
                :
                <Grid container justify="center">
                    <Grid item>
                        <Paper className={classes.Paper}>
                            <Typography>
                            No Matching User Email Found
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>}
            </Grid>
</Grid>
);
}

export default UserRole;
