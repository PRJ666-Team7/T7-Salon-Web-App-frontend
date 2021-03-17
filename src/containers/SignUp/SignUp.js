import React, { useEffect } from 'react'
import {Grid, Typography, withStyles, TextField, Button, ButtonBase} from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'
import {Helmet} from "react-helmet";
import axois from '../../components/helpers/axios'
import Cookies from 'js-cookie';

 const Title = withStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
        fontSize: "25px"
    }
 }))(Typography);

 const LinkText = withStyles((theme) => ({
    root: {
        color: "blue",
        paddingTop: theme.spacing(2),
        minWidth: "100px"
     }
 }))(Typography);

 const TextInput = withStyles((theme) => ({
    root: {
        maxWidth: "230px"
     }
 }))(TextField);

export default function SignUp() {
    const [value, setValue] = React.useState({email: '', fname: '', lname: '', phone: '', password: '', password2: ''});
    const [error, setError] = React.useState({email: '', fname: '', lname: '', phone: '', password: '', password2: ''});

    useEffect(() => {
        if (Cookies.get('jwt')){
            console.log("Cookies", Cookies.get('jwt'))
            window.location = "/"
        }
    }, [])

    const handleChange = (event) => {
        console.log("even", event.target.type)
        setValue({
            ...value,
            [event.target.id]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const nameRegex = /^([^0-9]*)$/
        const numberRegex = /^[0-9]{10,11}$/
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        let valid = true;
        let errors = {email: '', fname: '', lname: '', phone: '', password: '', password2: ''}

        if (!emailRegex.test(String(value.email).toLowerCase())) {
            errors.email= "Email must be valid email"
            valid = false;
        } else if (value.email.length == 0){
            errors.email = "Email is required"
        } else {
            errors.email = ""
        }

        if (!nameRegex.test(String(value.fname).toLowerCase())) {
            errors.fname= "First name must contain letters only"
            valid = false;
        } else if (value.fname.length == 0){
            errors.fname = "First name is required"
            valid = false;
        } else {
            errors.fname = ""
        }
        
        if (!nameRegex.test(String(value.lname).toLowerCase())) {
            errors.lname = "Last name must contain letters only"
            valid = false;
        } else if (!value.lname.length > 0){
            errors.lname = "Last name is required"
            valid = false;
        } else {
            errors.lname = ""
        }

        if (!numberRegex.test(String(value.phone).toLowerCase())) {
            errors.phone= "Must be valid phone number"
            valid = false;
        } else if (!value.phone.length > 0){
            errors.phone= "Phone number is required"
            valid = false;
        } else {
            errors.phone= ""
        }

        if (!passwordRegex.test(String(value.password).toLowerCase())) {
            errors.password= "Password must be 8 characters with at least one letter, number and special character"
            valid = false;
        } else if (!value.password.length > 0){
            errors.password= "Password is required"
            valid = false;
        } else {
            errors.password= ""
        }

        if (value.password == value.password2) {
            errors.password2= "Password do not match"
        } else if (!value.password2.length > 0){
            errors.password2= "Confirm password is required"
        } else {
            errors.password2= ""
        }

        setError(errors)

        if (valid) {
            axois.post('/signup', {...value})
                .then(function (response) {
                    Cookies.set('user', response.data.user, { expires: 7 });
                    Cookies.set('jwt', response.data.token, { expires: 7 });

                    if (Cookies.get('jwt')){
                        console.log("Cookies", Cookies.get('jwt'))
                        window.location = "/"
                    }
                })
        }
    };

    return (
        <Grid container>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>

            <MobileWindow elevation={5}>
                <Grid container justify="center" {...breakpointHelper.full}>
                    <Grid container justify="center" {...breakpointHelper.full}>
                        <Grid {...breakpointHelper.full}>
                            <Grid container justify="center">
                                <Title>
                                    Sign Up
                                </Title>
                            </Grid>
                        </Grid>
                        <Typography>
                            Please fill in the form to create an account
                        </Typography>
                    </Grid>

                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextInput
                            id="email"
                            label="Email"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.email != ''}
                            helperText={error.email}
                        />
                    </Grid>

                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextInput
                            id="fname"
                            label="First Name"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.fname != ''}
                            helperText={error.fname}
                        />
                    </Grid>
                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextInput
                            id="lname"
                            label="Last Name"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.lname != ''}
                            helperText={error.lname}
                        />
                    </Grid>
                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextInput
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.phone != ''}
                            helperText={error.phone}
                        />
                    </Grid>
                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextInput
                            id="password"
                            label="Password"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.password != ''}
                            helperText={error.password}
                            type="password"
                        />
                    </Grid>
                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextInput
                            id="password2"
                            label="Confirm password"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.password2 != ''}
                            helperText={error.password2}
                            type="password"
                        />
                    </Grid>

                    <Grid container justify="center">
                        <Grid>
                            <ButtonBase onClick={() => window.location.href = "/login"}>
                                <LinkText>
                                    Already a member? Log In
                                </LinkText>
                            </ButtonBase>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Sign up
                        </Button>
                    </Grid>
                </Grid>
            </MobileWindow>
        </Grid>
    )
}