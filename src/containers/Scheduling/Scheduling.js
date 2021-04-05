import React, { useEffect, useState } from 'react';
import { MenuItem, Typography, Container, TextField, Button, CssBaseline, Avatar, Grid, InputLabel  } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import Cookies from 'js-cookie';
import axois from '../../components/helpers/axios'
import { Alert } from '@material-ui/lab';
import moment from 'moment'

import { DatePicker } from "react-trip-date";
import Calendar from "./Calendar/Calendar"

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: theme.spacing(3, 0, 2), 
        backgroundColor: '#13c8b5'
    },
    toggleButton: {
        margin: theme.spacing(3, 0, 2), 
        backgroundColor: '#3385ff',
        textTransform: "capitalize"
    },
    timeInput: {
        width: "100%"
    },
    title: {
        width: "100%"
    }
}));

const filterDates = (workingDates) => {
    let date = moment()
    let disableDates = []

    const found = workingDates.find((d) => d == date.format("yyyy-MM-DD"))
    if (found == undefined){
        disableDates.push(date.format("yyyy-MM-DD"))
    }

    for (let index = 0; index < 60; index++) {
        date.add(1, 'd')

        const found = workingDates.find((d) => d == date.format("yyyy-MM-DD"))
        if (found == undefined){
            disableDates.push(date.format("yyyy-MM-DD"))
        }
    }

    return disableDates
}

function Scheduling() {
    const [showAddToggle, setShowAddToggle] = useState(true);

    const [value, setValue] = React.useState({ employee: '', date: [], startTime: '09:00',  endTime: '17:00' });
    const [error, setError] = React.useState({ employee: '', date: '', startTime: '',  endTime: '' });
    const [serverError, setServerError] = React.useState(false);
    const [serverWarn, setServerWarn] = React.useState(false);
    const [remainingDates, setRemainingDates] = React.useState([]);

    const [unscheduleValue, setUnscheduleValue] = React.useState({ employee: '', date: []});
    const [unscheduleError, setUnscheduleError] = React.useState({ employee: '', date: '' });
    const [disableDates, setDisableDates] = React.useState([]);

    const [employeeList, setEmployeeList] = useState([]);
    const [confirm, setConfirm] = useState({confirm: false, message: ""});

    const classes = useStyles();

    useEffect(() => {
        const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : ""
        if (Cookies.get('jwt') == undefined || !user.isAdmin) {
            window.location = '/'
        } 

        const token = Cookies.get('jwt')
        axois.get('/getEmp', {
            headers: {
                authorization: `JWT ${token}`
            }
        })
            .then(function (response) {
                if (response.data.status == "success") {
                    const emp =Object.keys(response.data.employeesData).map(e => {
                        return {value: response.data.employeesData[e].emp_id, name: response.data.employeesData[e].usr_name}
                    })

                    setEmployeeList(emp)

                    let services = {}
                    Object.keys(response.data.servicesData).map(e => {
                        services[response.data.servicesData[e].srv_name.toLowerCase()] = {
                            checked: false, 
                            value: response.data.servicesData[e].srv_id, 
                            name: response.data.servicesData[e].srv_name.toLowerCase(),
                            price: response.data.servicesData[e].srv_price 
                        }
                    })
                } else {
                    setServerError(true)
                }
            })
    }, []);

    const handleChangeTimes = (event) => {
        setValue({
            ...value,
            [event.target.id]: moment(moment(event.target.value, 'HH:mm')).add(30 - moment(event.target.value, 'HH:mm').minute() % 30, "minutes").format("HH:mm")
        });
    };

    const handleChangeEmployee = (event) => {
        setValue({
            ...value,
            employee: event.target.value
        });
    };

    const handleChangeUnscheduleEmployee = (event) => {
        const token = Cookies.get('jwt')

        axois.post('/getEmployeeScheduleDays', {employee: event.target.value}, {
            headers: {
                authorization: `JWT ${token}`
            }
        })
            .then(function (response) {
                if (response.data.status == "success") {
                    const disableDates = filterDates(response.data.workingDates)
                    setDisableDates(disableDates)
                } else {
                    setServerError(true)
                }
            })

        setUnscheduleValue({
            ...unscheduleValue,
            employee: event.target.value
        });
    };

    const handleChangeDate = (dates) => {
        setValue({
            ...value,
            date: dates
        });
    };

    const unscheduleHandleChangeDate = (dates) => {
        setUnscheduleValue({
            ...unscheduleValue,
            date: dates
        });
    };

    const submitHandler = async (event) => {
        let valid = true;
        let errors = { employee: '', date: '' }

        if (!value.employee) {
            errors.employee = "Employee must be selected"
            valid = false;
        } else {
            errors.employee = ""
        }

        if (value.date.length == 0) {
            errors.date = "date must be selected"
            valid = false;
        } else {
            errors.date = ""
        }

        if (moment(moment(value.startTime, 'HH:mm')).isAfter(moment(value.endTime, 'HH:mm'))) {
            errors.endTime = "End time must be after start time"
            valid = false;
        }else {
            errors.endTime = ""
        }

        setError(errors)

        if (valid) {
            const token = Cookies.get('jwt')

            axois.post('/scheduleEmployee', { employee: value.employee, date: value.date, startTime: value.startTime,  endTime: value.endTime}, {
                headers: {
                    authorization: `JWT ${token}`
                }
            })
                .then(function (response) {
                    if (response.data.status == "success") {
                        setServerError(false)
                        setConfirm({confirm: true, message: "Employee schedule successfully added"})
                    } else {
                        setServerError(true)
                    }
                })
        }
    };

    const unschedulesubmitHandler = async (event) => {
        let valid = true;
        let errors = { employee: '', date: '' }

        if (!unscheduleValue.employee) {
            errors.employee = "Employee must be selected"
            valid = false;
        } else {
            errors.employee = ""
        }

        if (unscheduleValue.date.length == 0) {
            errors.date = "date must be selected"
            valid = false;
        } else {
            errors.date = ""
        }

        setUnscheduleError(errors)

        if (valid) {
            const token = Cookies.get('jwt')

            axois.post('/unscheduleEmployee', { employee: unscheduleValue.employee, date: unscheduleValue.date}, {
                headers: {
                    authorization: `JWT ${token}`
                }
            })
                .then(function (response) {
                    if (response.data.status == "success") {
                        const disableDates = filterDates(response.data.workingDates)
                        setDisableDates(disableDates)
                        setServerError(false)
                        setConfirm({confirm: true, message: "Employee schedule successfully removed"})

                        if (response.data.remainingAppointments.length > 0){
                            setServerWarn(true)

                            let remainingAppointments = []
                            response.data.remainingAppointments.map(r => {
                                const date = moment(r.apt_date, "yyyy-MM-DD")
                                const startTime = moment(r.apt_time_start, "hh:mm:ss")

                                remainingAppointments.push({
                                    date: date.format("yyyy-MM-DD"),
                                    startTime: moment(r.apt_time_start, "hh:mm:ss").format("h:mm A"),
                                    endTime: moment(r.apt_time_end, "hh:mm:ss").format("h:mm A")
                                })

                            })
                            setRemainingDates(remainingAppointments)
                        } else {
                            setServerWarn(false)
                        }
                    } else {
                        setServerError(true)
                    }
                })
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Helmet>
                <title>Scheduling</title>
            </Helmet>
            {confirm.confirm && <Alert severity="success" onClose={() => setConfirm({confirm: false, message: ""})}> {confirm.message}</Alert>}
            {serverWarn && <Alert style={{position: "absolute", top: "30%", left: "41%", zIndex: "1500"}} severity="warning" onClose={() => setServerWarn(false)}>Warning: The following appointment could not be <br/> remove as users have booked them 
                {remainingDates.map(d => 
                <Typography>
                    Date: {d.date} at {d.startTime} - {d.endTime}
                </Typography>    
                )}
            </Alert>}

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EventNoteIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ paddingBottom: "15px" }}>
                    Scheduling
                </Typography>

                {serverError && <Alert severity="error" onClose={() => setServerError(false)}>Invalid </Alert>}

                <Button className={classes.toggleButton} onClick={() => setShowAddToggle(!showAddToggle)} fullWidth variant="contained" color="primary"> {showAddToggle ? "unschedule" : "schedule" }</Button>

                {showAddToggle ?
                    <Grid container spacing={2}>
                        <Typography align="center" component="h1" variant="h5" style={{ padding: "15px 0px" }} className={classes.title}>Schedule Employee </Typography>
                        <Grid item xs={12}>
                            <TextField
                                id="employee"
                                fullWidth
                                select
                                label="Employee"
                                value={value.employee}
                                error={error.employee != ''}
                                helperText={error.employee}
                                onChange={handleChangeEmployee}
                                helperText="Please choose an employee"
                                variant="filled">
                                {employeeList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel style={{ paddingBottom: "10px" }}>
                                Dates:
                        </InputLabel>
                            <Calendar
                                handleChangeDate={handleChangeDate}
                            />
                            <InputLabel error style={{ paddingBottom: "10px" }}>
                                {error.date}
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="startTime"
                                label="Starting Time"
                                type="time"
                                value={value.startTime}
                                className={classes.timeInput}
                                onChange={handleChangeTimes}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="endTime"
                                label="End Time"
                                type="time"
                                value={value.endTime}
                                error={error.endTime != ''}
                                helperText={error.endTime}
                                className={classes.timeInput}
                                onChange={handleChangeTimes}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </Grid>
                        <Button className={classes.button} onClick={submitHandler} type="submit" fullWidth variant="contained" color="primary">Submit</Button>

                    </Grid> :
                    <Grid container spacing={2}>
                        <Typography align="center" component="h1" variant="h5" style={{ padding: "15px 0px" }} className={classes.title}>Unschedule Employee</Typography>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Employee"
                                value={unscheduleValue.employee}
                                error={unscheduleError.employee != ''}
                                helperText={unscheduleError.employee}
                                onChange={handleChangeUnscheduleEmployee}
                                helperText="Please choose an employee"
                                variant="filled">
                                {employeeList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel style={{ paddingBottom: "10px" }}>
                                Dates:
                            </InputLabel>
                            <DatePicker
                                style={{ backgroundColor: "blue" }}
                                numberOfMonths={2}
                                disabledBeforeToday
                                disabled={unscheduleValue.employee == "" ? true : false}
                                disabledDays={disableDates}
                                onChange={dates => unscheduleHandleChangeDate(dates)}
                            />
                            <InputLabel error style={{ paddingBottom: "10px" }}>
                                {unscheduleError.date}
                            </InputLabel>
                        </Grid>
                        <Button className={classes.button} onClick={unschedulesubmitHandler} type="submit" fullWidth variant="contained" color="primary">Submit</Button>
                    </Grid>
                }
            </div>
        </Container>
    )
}


export default Scheduling;