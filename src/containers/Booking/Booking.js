import React, { useEffect, useState } from 'react';
import { MenuItem, Typography, Container, TextField, Checkbox, FormLabel, Button, CssBaseline, Avatar, Grid } from '@material-ui/core';
import { FormGroup, FormControl, FormControlLabel } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import Cookies from 'js-cookie';
import axois from '../../components/helpers/axios'
import { Alert } from '@material-ui/lab';

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
    },
}));

const initValue = () => {
    if (Cookies.get('jwt') == undefined) {
        window.location = '/login'
    }
    const user = JSON.parse(Cookies.get('user'))

    return { time: '2021-02-22T09:00', name: user.fname, phone: user.phone, email: user.email }
}

function Appointment() {
    const [value, setValue] = React.useState(initValue());
    const [error, setError] = React.useState({ name: '', phone: '', email: '', time: '', employee: '', service: '' });
    const [serverError, setServerError] = React.useState(false);

    const [employee, setEmployee] = useState('');
    const [employeeList, setEmployeeList] = useState([]);
    const [service, setService] = useState([]);
    const [price, setPrice] = useState(0);
    const [confirm, setConfirm] = useState(false);


    const classes = useStyles();

    const handleChangeService = (event) => {
        setService({ ...service, [event.target.name]: { ...service[event.target.name], checked: event.target.checked} });
    };

    const handleChangeEmployee = (event) => {
        setEmployee(event.target.value);
    };

    useEffect(() => {
        let price = 0;
        Object.keys(service).map(i => {
            if (service[i].checked){
                price += parseInt(service[i].price)
            }
        })

        setPrice(price)
    }, [service]);

    useEffect(() => {
        if (Cookies.get('jwt') == undefined) {
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
                    setService(services)
                } else {
                    setServerError(true)
                }
            })
    }, []);

    const handleChange = (event) => {
        setValue({
            ...value,
            [event.target.id]: event.target.value
        });
    };

    const keyPress = (event) => {
        if (event.keyCode == 13) {
            submitHandler()
        }
    }

    const submitHandler = async (event) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const nameRegex = /^([^0-9]*)$/
        const numberRegex = /^[0-9]{10,11}$/

        let valid = true;
        let errors = { name: '', phone: '', email: '', time: '', employee: '', service: ''}

        if (!emailRegex.test(String(value.email).toLowerCase())) {
            errors.email = "Email must be valid email"
            valid = false;
        } else if (value.email.length == 0) {
            errors.email = "Email is required"
            valid = false;
        } else if (value.email.length > 50) {
            errors.email = "Email must between 1 - 50"
            valid = false;
        } else {
            errors.email = ""
        }

        if (!nameRegex.test(String(value.name).toLowerCase())) {
            errors.name = "First name must contain letters only"
            valid = false;
        } else if (value.name.length == 0) {
            errors.name = "First name is required"
            valid = false;
        } else if (value.name.length > 45) {
            errors.name = "First name must between 1 - 45"
            valid = false;
        } else {
            errors.name = ""
        }

        if (!numberRegex.test(String(value.phone).toLowerCase())) {
            errors.phone = "Must be valid phone number"
            valid = false;
        } else if (!value.phone.length > 0) {
            errors.phone = "Phone number is required"
            valid = false;
        } else {
            errors.phone = ""
        }
        
        if (!employee) {
            errors.employee = "Employee must be selected"
            valid = false;
        } else {
            errors.employee = ""
        }

        const selectedService = Object.keys(service).some(i => {
            return service[i].checked
        })

        if (selectedService){
            errors.service = ""
        } else {
            errors.service = "At least one service must be selected"
            valid = false;
        }

        setError(errors)

        if (valid) {
            const token = Cookies.get('jwt')
            const date = value.time.split("T")[0];
            const time = value.time.split("T")[1];

            const serviceIds = []
            Object.keys(service).map(i => {
                if( service[i].checked) {
                    serviceIds.push(service[i].value)
                }
            })

            axois.post('/addApt', { empId: employee, date: date, time: time, services: serviceIds, email: value.email }, {
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

    return (
        <Container component="main" maxWidth="xs">
            <Helmet>
                <title>Booking</title>
            </Helmet>
            {confirm && <Alert severity="success" onClose={() => setConfirm(false)}>Booked appointment successfully </Alert>}

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EventNoteIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ paddingBottom: "15px" }}>
                    Booking Appointment
                </Typography>

                {serverError && <Alert severity="error" onClose={() => setServerError(false)}>Invalid </Alert>}


                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.name != ''}
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
                            error={error.phone != ''}
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
                            error={error.email != ''}
                            helperText={error.email}
                            value={value.email}
                            onKeyDown={keyPress}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="employee"
                            fullWidth
                            select
                            label="Employee"
                            value={employee}
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
                        <TextField
                            fullWidth
                            id="time"
                            label="Appointment"
                            type="datetime-local"
                            onChange={handleChange}
                            defaultValue="2021-02-22T09:00"
                            InputLabelProps={{ shrink: true, }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel>Services</FormLabel>
                        <FormGroup row>
                            {Object.keys(service).map((i) => (
                                <FormControlLabel
                                    style={{
                                        textTransform: 'capitalize'
                                    }}
                                    control={<Checkbox
                                        checked={service[i].checked}
                                        onChange={handleChangeService}
                                        name={service[i].name} />}
                                    label={service[i].name} />
                            ))}
                        {error.service && <Typography color="error" style={{paddingBottom: "10px"}}>{error.service}</Typography>}
                        </FormGroup>
                    </Grid>
                </Grid>
                <Typography style={{fontWeight: "bold"}}>
                    Estimate Price: ${price}
                </Typography>
                <Button className={classes.button} onClick={submitHandler} type="submit" fullWidth variant="contained" color="primary">Submit</Button>
                {/* <Button className={classes.button} type="reset" fullWidth variant="contained">Clear</Button> */}
            </div>
        </Container>
    )
}


export default Appointment;