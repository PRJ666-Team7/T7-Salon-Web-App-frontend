import React, { useEffect, useState } from 'react';
import { MenuItem, Typography, Container, TextField, Checkbox, FormLabel, Button, CssBaseline, Avatar, Grid, InputLabel } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import Cookies from 'js-cookie';
import axois from '../../components/helpers/axios'
import { Alert } from '@material-ui/lab';
import moment from 'moment'

import { DatePicker } from "react-trip-date";
import { RepeatOneSharp } from '@material-ui/icons';

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
    timeInput: {
        width: "100%"
    }
}));

const initValue = () => {
    if (Cookies.get('jwt') == undefined) {
        window.location = '/'
    }
    const user = JSON.parse(Cookies.get('user'))

    return { time: '2021-02-22T09:00', name: user.fname, phone: user.phone, email: user.email }
}

function Scheduling() {
    const [value, setValue] = React.useState({ employee: '', date: [], startTime: '09:00',  endTime: '17:00' });
    const [error, setError] = React.useState({ employee: '', date: '', startTime: '',  endTime: '' });
    const [serverError, setServerError] = React.useState(false);

    const [employeeList, setEmployeeList] = useState([]);
    const [confirm, setConfirm] = useState(false);
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
        console.log("event.target.id", event.target.id, event.target.value)

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

    const handleChangeDate = (dates) => {
        setValue({
            ...value,
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

            axois.post('/scheduleEmployee', {  employee: value.employee, date: value.date, startTime: value.startTime,  endTime: value.endTime}, {
                headers: {
                    authorization: `JWT ${token}`
                }
            })
                .then(function (response) {
                    if (response.data.status == "success") {
                        setServerError(false)
                        setConfirm(true)
                    } else {
                        setServerError(true)
                    }
                })
        }
    };

    console.log("state value", value)

    return (
        <Container component="main" maxWidth="xs">
            <Helmet>
                <title>Scheduling</title>
            </Helmet>
            {confirm && <Alert severity="success" onClose={() => setConfirm(false)}>Employee schedule successfully added </Alert>}

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EventNoteIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ paddingBottom: "15px" }}>
                    Scheduling
                </Typography>

                {serverError && <Alert severity="error" onClose={() => setServerError(false)}>Invalid </Alert>}

                <Grid container spacing={2}>
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
                        <InputLabel style={{paddingBottom: "10px"}}>
                            Dates:
                        </InputLabel>
                        <DatePicker
                            style={{backgroundColor: "blue"}}
                            numberOfMonths={2}
                            disabledBeforeToday
                            onChange={dates => handleChangeDate(dates)}
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
                </Grid>
                <Button className={classes.button} onClick={submitHandler} type="submit" fullWidth variant="contained" color="primary">Submit</Button>
            </div>
        </Container>
    )
}


export default Scheduling;