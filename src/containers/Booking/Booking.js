import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Typography,
  Container,
  TextField,
  Checkbox,
  FormLabel,
  Button,
  CssBaseline,
  Avatar,
  Grid,
  Select,
  Chip,
  Input,
} from "@material-ui/core";
import { FormGroup, FormControl, FormControlLabel } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import Cookies, { set } from "js-cookie";
import axois from "../../components/helpers/axios";
import { Alert } from "@material-ui/lab";
import { Timer10Sharp, ViewArrayOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initValue = () => {

  if (Cookies.get("jwt") == undefined) {
    window.location = "/login";
  }
  const user = JSON.parse(Cookies.get("user"));

  return {
    time: "2021-02-22T09:00",
    name: user.fname,
    phone: user.phone,
    email: user.email,
  };
};

function Appointment() {
  const [value, setValue] = React.useState(initValue());
  const [error, setError] = React.useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    employee: "",
    service: "",
  });
  const [serverError, setServerError] = React.useState(false);

  const [employee, setEmployee] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [allEmployeeList, setAllEmployeeList] = useState([]);

  const [service, setService] = useState([]);
  //const [serviceList, setServiceList] = useState([]);
  const [slService, setslService] = useState();

  const [appointment, setAppointment] = useState([]);

  const [date, setDate] = useState("");
  const [dateList, setDateList] = useState([]);
  const [allDateList, setAllDateList] = useState([]);

  
  const [time, setTime] = useState("");
  const [times, setTimes] = useState([]);
  const [allTimeList, setAllTimeList] = useState([]);
  const [timeList, setTimeList] = useState([]);

  //const [aptId, setAptId] = useState();
  const [aptIds, setAptIds] = useState([]);

  const [price, setPrice] = useState(0);
  const [confirm, setConfirm] = useState(false);

  const [form, setForm] = useState(false);
  const [formType, setFormType] = useState("Choose by Employee");

  const classes = useStyles();

  const handleChangeService = (event) => {
    setService({
      ...service,
      [event.target.name]: {
        ...service[event.target.name],
        checked: event.target.checked,
      },
    });
  };

  const handleChangeSelectService = (event) => {
    setslService(event.target.value)
    //console.log(event.target.value + "servicesl")
  };

  const handleChangeEmployee = (event) => {
    if(!form){
        setEmployee(event.target.value);
        const dates = new Set();
        for (var i = 0; i < appointment.length; i++) {
        if (appointment[i].emp === event.target.value)
            dates.add(appointment[i].date);
        }
        setDateList(Array.from(dates));
        setDate("");
        setTimes([]);
        setTimeList([]);
    }
    else{
        setEmployee(event.target.value);
        var apt;
        appointment.map(a => {
            if(a.date === date){
                if(a.time === time){
                    if(a.emp === event.target.value){
                        apt = a.value;
                    }
                }
            }
        })
        console.log([apt])
        setAptIds([apt]);
    }
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
    if(!form){
        const timesList = [];
        appointment.map((e) => {
        if (e.emp === employee) {
            if (e.date === event.target.value) {
            timesList.push({
                value: e.value,
                time: e.time,
            });
            }
        }
        });
        setTimeList(timesList);
        setTimes([]);
    }
    else{
        const setOfTime = new Set();
        appointment.map((e) => {
          if(e.date === event.target.value){
            setOfTime.add(e.time);
          }
        })
        setAllTimeList(Array.from(setOfTime))
        setTime("");
        setEmployeeList([])
    }
  };

  const handleChangeTime = (event) => {
    if(!form){
        setTimes(event.target.value);
        var id = [];
        const list = timeList.map((e) => {
        for (var i = 0; i < event.target.value.length; i++) {
            if (e.time === event.target.value[i]) {
            id.push(e.value);
            }
        }
        });
        setAptIds(id);
        console.log(event.target.value);
        console.log(id);
    }
    else{
        setTime(event.target.value);    
        var emp = new Set();
        const list = appointment.map((a) => {
            if(a.date === date){
                if(a.time === event.target.value){
                   emp.add(a.emp)
                }
            }
        })
        var empName = new Set();
        allEmployeeList.map(e => {
            if(emp.has(e.value)){
                empName.add(e.name);
            }
        })
        var empArr = Array.from(emp)
        var empNameArr = Array.from(empName)
        var selectedEmp = []
        for(var i = 0; i < empNameArr.length; i++){
            selectedEmp.push({
                value: empArr[i],
                name: empNameArr[i],
            })
        }
        console.log(selectedEmp);
        setEmployee("")
        setEmployeeList(selectedEmp);
    }
  };

  useEffect(() => {
    let price = 0;
    if(!form){
    Object.keys(service).map((i) => {
      if (service[i].checked) {
        price += parseInt(service[i].price);
      }
    });
  }else{
    console.log(slService + "service id")
    Object.keys(service).map((i) => {
      if(slService === service[i].value){
        price = parseInt(service[i].price);
      }
    });
  }
    setPrice(price);

  }, [service, slService]);

  useEffect(() => {
    if (Cookies.get("jwt") == undefined) {
      window.location = "/";
    }

    const token = Cookies.get("jwt");
    axois
      .get("/getEmp", {
        headers: {
          authorization: `JWT ${token}`,
        },
      })
      .then(function (response) {
        if (response.data.status == "success") {
          const emp = Object.keys(response.data.employeesData).map((e) => {
            return {
              value: response.data.employeesData[e].emp_id,
              name: response.data.employeesData[e].usr_name,
            };
          });

          setAllEmployeeList(emp);

          let services = {};
          Object.keys(response.data.servicesData).map((e) => {
            services[response.data.servicesData[e].srv_name.toLowerCase()] = {
              checked: false,
              value: response.data.servicesData[e].srv_id,
              name: response.data.servicesData[e].srv_name.toLowerCase(),
              price: response.data.servicesData[e].srv_price,
            };
          });
          setService(services);
          const setDates = new Set()
          const appointments = Object.keys(response.data.appointmentData).map(
            (e) => {
              setDates.add(response.data.appointmentData[e].apt_date.split("T")[0])
              return {
                value: response.data.appointmentData[e].apt_id,
                emp: response.data.appointmentData[e].emp_id,
                date: response.data.appointmentData[e].apt_date.split("T")[0],
                time:
                  "From " +
                  response.data.appointmentData[e].apt_time_start +
                  " to " +
                  response.data.appointmentData[e].apt_time_end,
              };
            }
          );
          setAppointment(appointments);
          
          setAllDateList(Array.from(setDates))

        } else {
          setServerError(true);
        }
      });
  }, []);

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.id]: event.target.value,
    });
  };

  const keyPress = (event) => {
    if (event.keyCode == 13) {
      submitHandler();
    }
  };

  const formChangeHandler = (event) => {
    if (form) {
      setFormType("Choose by Employee");
    } else {
      setFormType("Choose by Date");
    }
    setError({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      employee: "",
      service: "",
    })
    setDate("");
    setDateList([]);
    setTime("");
    setTimes([]);
    setTimeList([]);
    setAllTimeList([]);
    setslService("");
    setEmployee("");
    setEmployeeList([]);
    setForm(!form);

  };

  const submitHandler = async (event) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameRegex = /^([^0-9]*)$/;
    const numberRegex = /^[0-9]{10,11}$/;

    let valid = true;
    let errors = {
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      employee: "",
      service: "",
    };

    if (!emailRegex.test(String(value.email).toLowerCase())) {
      errors.email = "Email must be valid email";
      valid = false;
    } else if (value.email.length == 0) {
      errors.email = "Email is required";
      valid = false;
    } else if (value.email.length > 50) {
      errors.email = "Email must between 1 - 50";
      valid = false;
    } else {
      errors.email = "";
    }

    if (!nameRegex.test(String(value.name).toLowerCase())) {
      errors.name = "First name must contain letters only";
      valid = false;
    } else if (value.name.length == 0) {
      errors.name = "First name is required";
      valid = false;
    } else if (value.name.length > 45) {
      errors.name = "First name must between 1 - 45";
      valid = false;
    } else {
      errors.name = "";
    }

    if (!numberRegex.test(String(value.phone).toLowerCase())) {
      errors.phone = "Must be valid phone number";
      valid = false;
    } else if (!value.phone.length > 0) {
      errors.phone = "Phone number is required";
      valid = false;
    } else {
      errors.phone = "";
    }

    if (!employee) {
      errors.employee = "Employee must be selected";
      valid = false;
    } else {
      errors.employee = "";
    }

    if (!date) {
      errors.date = "Date must be selected";
      valid = false;
    } else {
      errors.date = "";
    }



    if(!form){

        var checkedService = 0;
        const serviceList = Object.keys(service).map((i) => {
          if (service[i].checked) {
            checkedService += 1;
          }
        });
        if (!times || times.length == 0) {
          errors.time = "Time must be selected";
          valid = false;
        } else if (checkedService !== times.length) {
          errors.time = "Selected time slots do not match the number of services";
          valid = false;
        } else {
          errors.time = "";
        }

        const selectedService = Object.keys(service).some((i) => {
        return service[i].checked;
        });

        if (selectedService) {
        errors.service = "";
        } else {
        errors.service = "At least one service must be selected";
        valid = false;
        }
    }
    else{
        if(!time){
            errors.time = "Time must be selected"
            valid = false;
        }
        else{
            errors.time = "";
        }

        if(slService){
            errors.service = "";
        } else {
            errors.service = "Please selesct a service"
            valid = false;
        }
    }
    setError(errors);

    const token = Cookies.get("jwt");
    var timeString;
    var startTime;
    var serviceIds = [];
    if (valid) {
      
      if(!form){
      timeString = times[0].split("From ")[1];
      startTime = timeString.split(" to")[0];

      Object.keys(service).map((i) => {
        if (service[i].checked) {
          serviceIds.push(service[i].value);
        }
      });
    }
    else{
      timeString = time.split("From ")[1];
      startTime = timeString.split(" to")[0];
      serviceIds = [slService]

    }
      axois
        .post(
          "/addApt",
          {
            aptId: aptIds,
            date: date,
            time: startTime,
            services: serviceIds,
            email: value.email,
          },
          {
            headers: {
              authorization: `JWT ${token}`,
            },
          }
        )
        .then(function (response) {
          if (response.data.status == "success") {
            setServerError(false);
            setConfirm(true);
            setEmployee("");
            setDate("");
            setTimes([]);
            setTimeList([]);
            window.location = '/booking';
          } else {
            setServerError(true);
          }
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Booking</title>
      </Helmet>
      {confirm && (
        <Alert severity="success" onClose={() => setConfirm(false)}>
          Booked appointment successfully{" "}
        </Alert>
      )}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EventNoteIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ paddingBottom: "15px" }}
        >
          Booking Appointment
        </Typography>

        {serverError && (
          <Alert severity="error" onClose={() => setServerError(false)}>
            Invalid{" "}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              error={error.name != ""}
              helperText={error.name}
              value={value.name}
              onKeyDown={keyPress}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              variant="outlined"
              onChange={handleChange}
              error={error.phone != ""}
              helperText={error.phone}
              value={value.phone}
              onKeyDown={keyPress}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              error={error.email != ""}
              helperText={error.email}
              value={value.email}
              onKeyDown={keyPress}
            />
          </Grid>

          <Button
            className={classes.button}
            onClick={formChangeHandler}
            fullWidth
            variant="contained"
            color="secondary"
          >
            {formType}
          </Button>

          {form && <Grid item xs={12}>
              <TextField
                id="service"
                fullWidth
                select
                label="Service"
                value={slService}
                error={error.service !== ""}
                helperText={error.service}
                onChange={handleChangeSelectService}
                helperText="Please pick a service"
                variant="filled"
                disabled={service.length === 0}
              >
                {Object.keys(service).map((i) => (
                  <MenuItem key={service[i].value} value={service[i].value}>
                    {service[i].name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>}


          {form && (
            <Grid item xs={12}>
              <TextField
                id="date"
                fullWidth
                select
                label="Date"
                value={date}
                error={error.date !== ""}
                helperText={error.date}
                onChange={handleChangeDate}
                helperText="Please select an available date"
                variant="filled"
                disabled={allDateList.length === 0}
              >
                {allDateList.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {form && (
            <Grid item xs={12}>
              <TextField
                id="time"
                fullWidth
                select
                label="Time"
                value={time}
                error={error.time !== ""}
                helperText={error.time}
                onChange={handleChangeTime}
                helperText="Please pick an available time"
                variant="filled"
                disabled={allTimeList.length === 0}
              >
                {allTimeList.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {form && (
            <Grid item xs={12}>
              <TextField
                id="employee"
                fullWidth
                select
                label="Employee"
                value={employee}
                error={error.employee != ""}
                helperText={error.employee}
                onChange={handleChangeEmployee}
                helperText="Please choose an employee"
                variant="filled"
                disabled={employeeList.length === 0}
              >
                {employeeList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          


          {!form && <Grid item xs={12}>
            <FormLabel>Services</FormLabel>
            <FormGroup row>
              {Object.keys(service).map((i) => (
                <FormControlLabel
                  style={{
                    textTransform: "capitalize",
                  }}
                  control={
                    <Checkbox
                      checked={service[i].checked}
                      onChange={handleChangeService}
                      name={service[i].name}
                    />
                  }
                  label={service[i].name}
                />
              ))}
              {error.service && (
                <Typography color="error" style={{ paddingBottom: "10px" }}>
                  {error.service}
                </Typography>
              )}
            </FormGroup>
          </Grid>}

          {!form && (
            <Grid item xs={12}>
              <TextField
                id="employee"
                fullWidth
                select
                label="Employee"
                value={employee}
                error={error.employee != ""}
                helperText={error.employee}
                onChange={handleChangeEmployee}
                helperText="Please choose an employee"
                variant="filled"
              >
                {allEmployeeList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {!form && (
            <Grid item xs={12}>
              <TextField
                id="date"
                fullWidth
                select
                label="Date"
                value={date}
                error={error.date !== ""}
                helperText={error.date}
                onChange={handleChangeDate}
                helperText="Please select an available date"
                variant="filled"
                disabled={dateList.length === 0}
              >
                {dateList.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {!form && (
            <Grid item xs={12}>
              <Select
                labelId="chip-time"
                id="chip-time"
                fullWidth
                multiple
                value={times}
                error={error.time !== ""}
                onChange={handleChangeTime}
                input={<Input id="select-multiple-chip" />}
                disabled={timeList.length === 0}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                //MenuProps={MenuProps}
              >
                {timeList.map((option) => (
                  <MenuItem key={option.value} value={option.time}>
                    {option.time}
                  </MenuItem>
                ))}
              </Select>
              {error.time && (
                <Typography
                  color="error"
                  style={{ paddingBottom: "10px", fontSize: "15px" }}
                >
                  {error.time}
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
        <Typography style={{ fontWeight: "bold" }}>
          Estimate Price: ${price}
        </Typography>
        <Button
          className={classes.button}
          onClick={submitHandler}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        {/* <Button className={classes.button} type="reset" fullWidth variant="contained">Clear</Button> */}
      </div>
    </Container>
  );
}

export default Appointment;
