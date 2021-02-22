import React, { useEffect, useState } from 'react';
import { MenuItem, Typography, Container, TextField, Checkbox, FormLabel, Button, CssBaseline, Avatar, Grid } from'@material-ui/core';
import { FormGroup, FormControl, FormControlLabel } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';


const employees = [
    {
        value: 'jack',
        label: 'Jack',
    },
    {
        value: 'jason',
        label: 'Jason',
    },
    {
        value: 'jasper',
        label: 'Jasper',
    },
    {
        value: 'yifan',
        label: 'Yifan',
    },
];

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



function Appointment(){
    const classes = useStyles();
    const [employee, setEmployee] = useState('jason');
    const [service, setService] = useState({
        manicure: false,
        pedicure: false,
        acrylic: false,
        shellacManicure: false,
        shellacPedicure: false, 
    });

    //const [employeeSelected, setEmployeeSelected] = useState(false);

    const handleChangeService = (event) => {
        //setEmployee(event.target.value);
        setService({...service, [event.target.name]: event.target.checked });
    };
    const handleChangeEmployee = (event) => {
        setEmployee(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

    }
    const handleClear = (event) => {
        setService ({
        manicure: false,
        pedicure: false,
        acrylic: false,
        shellacManicure: false,
        shellacPedicure: false, });
        setEmployee ('jason');       
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EventNoteIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Booking Appointment
                </Typography>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField 
                    required
                    fullWidth 
                    id="name" 
                    name="name" 
                    label="Name" 
                    variant="outlined"/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField 
                    required
                    fullWidth 
                    id="phoneNum" 
                    name="phoneNum" 
                    label="Phone Number" 
                    variant="outlined"/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField 
                    required
                    fullWidth 
                    id="email" 
                    label="Email" 
                    variant="outlined" />
                     </Grid>
                <Grid item xs={12}>
                <TextField 
                id="employee"
                fullWidth 
                select 
                label="Employee"
                value={employee}
                onChange={handleChangeEmployee}
                helperText="Please choose an employee"
                variant="filled">
                {employees.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                 ))}
                </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    id="appointment"
                    label="Appointment"
                    type="datetime-local"
                    defaultValue="2021-02-22T09:00"
                    InputLabelProps={{shrink: true,}}
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>Services</FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                        control={<Checkbox checked={service.manicure} onChange={handleChangeService} name="manicure" />}
                        label="Manicure"/>
                        <FormControlLabel
                        control={<Checkbox checked={service.pedicure} onChange={handleChangeService} name="pedicure" />}
                        label="Pedicure"/>
                        <FormControlLabel
                        control={<Checkbox checked={service.acrylic} onChange={handleChangeService} name="acrylic" />}
                        label="Acrylic"/>
                        <FormControlLabel
                        control={<Checkbox checked={service.shellacManicure} onChange={handleChangeService} name="shellacManicure" />}
                        label="Shellac Manicure"/>
                        <FormControlLabel
                        control={<Checkbox checked={service.shellacPedicure} onChange={handleChangeService} name="shellacPedicure" />}
                        label="Shellac Pedicure"/>
                    </FormGroup>
                </Grid>
            </Grid>
            <Button className={classes.button} type="submit" fullWidth variant="contained" color="primary">Submit</Button>
            <Button className={classes.button} onClick={handleClear} type="reset" fullWidth variant="contained">Clear</Button>
            </form>
            </div>
            </Container>
    )
}


export default Appointment;