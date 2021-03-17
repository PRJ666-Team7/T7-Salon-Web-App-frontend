import React, { Component } from 'react'
import { Grid, Typography, withStyles, Paper, TextField, ButtonBase, Button } from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'
import { Helmet } from "react-helmet";
import axois from '../../components/helpers/axios'
import Cookies from 'js-cookie';

const Title = withStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
        fontSize: "25px"
    }
}))(Typography);

const ForgotEmail = withStyles((theme) => ({
    root: {
        color: "blue",
        paddingTop: theme.spacing(2),
        paddingLeft: "100%",
        minWidth: "100px"
    }
}))(Typography);

const SignUp = withStyles((theme) => ({
    root: {
        color: "blue",
        paddingTop: theme.spacing(2),
        paddingRight: "100%",
        minWidth: "100px"
    }
}))(Typography);

const LoginButton = withStyles((theme) => ({
    root: {
        //   backgroundColor: "#00e6e6"  
    }
}))(Button);

export default function Login() {
    const [value, setValue] = React.useState({email: '', password: ''});
    const [error, setError] = React.useState({email: '', password: ''});

    const submitHandler = async (event) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let valid = true;
        let errors = {email: '', password: ''}

        if (!emailRegex.test(String(value.email).toLowerCase())) {
            errors.email= "Email must be valid email"
            valid = false;
        } else if (value.email.length == 0){
            errors.email= "Email is required"
        } else {
            errors.email= ""
        }

        if (!value.password.length > 0){
            errors.password= "Password is required"
            valid = false;
        } else {
            errors.password= ""
        }

        setError(errors)

        if (valid) {
            axois.post('/login', {
                email: value.email,
                password: value.password
            })
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

    const handleChange = (event) => {
        setValue({
            ...value,
            [event.target.id]: event.target.value
        });
    };

    return (
        <Grid container>
            <Helmet>
                <title>Sign In</title>
            </Helmet>

            <MobileWindow elevation={5}>
                <Grid container justify="center" {...breakpointHelper.full}>
                    <Grid container justify="center" {...breakpointHelper.full}>
                        <Grid {...breakpointHelper.full}>
                            <Grid container justify="center">
                                <Title>
                                    Sign in
                                </Title>
                            </Grid>
                        </Grid>
                        <Typography>
                            Login into your Sherry's Nails and Spa account
                        </Typography>
                    </Grid>

                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.email != ''}
                            helperText={error.email}
                        />
                    </Grid>

                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            onChange={handleChange}
                            error={error.password != ''}
                            helperText={error.password}
                            type="password"
                        />
                    </Grid>
                    <Grid container justify="center">
                        <Grid>
                            <ButtonBase onClick={() => window.location.href = "/signUp"}>
                                <SignUp>
                                    Sign up
                                </SignUp>
                            </ButtonBase>
                        </Grid>
                        <Grid>
                            <ButtonBase onClick={() => window.location.href = "/forgotPassword"}>
                                <ForgotEmail>
                                    Forgot email?
                                </ForgotEmail>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <LoginButton variant="contained" onClick={submitHandler}>
                            Login
                        </LoginButton>
                    </Grid>
                </Grid>
            </MobileWindow>
        </Grid>
    )
}
