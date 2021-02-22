import React, { Component } from 'react'
import {Grid, Typography, withStyles, Paper, TextField, ButtonBase, Button} from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'
import {Helmet} from "react-helmet";

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

export class Contact extends Component {
    render() {
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
                                        Sign in
                                    </Title>
                                </Grid>
                            </Grid>
                            <Typography>
                                Login into your Sherry's Nails and Spa account
                            </Typography>
                        </Grid>

                        <Grid container justify="center" {...breakpointHelper.full} style={{paddingTop: "20px"}}>
                            <TextField
                                id="filled-required"
                                label="Email"
                                variant="outlined"
                                />
                        </Grid>

                        <Grid container justify="center" {...breakpointHelper.full} style={{paddingTop: "20px"}}>
                            <TextField
                                id="filled-required"
                                label="Password"
                                variant="outlined"
                                />
                        </Grid>
                        <Grid container justify="center">
                            <Grid>
                                <ButtonBase onClick={() => window.location.href="/signUp"}>
                                    <SignUp>
                                        Sign up
                                    </SignUp>
                                </ButtonBase>
                            </Grid>
                            <Grid>
                                <ButtonBase onClick={() => window.location.href="/forgotPassword"}>
                                    <ForgotEmail>
                                        Forgot email?
                                    </ForgotEmail>
                                </ButtonBase>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" {...breakpointHelper.full} style={{paddingTop: "20px"}}>
                            <LoginButton variant="contained">
                                Login
                            </LoginButton>
                        </Grid>
                    </Grid>
                </MobileWindow>
            </Grid>
            )
        }
    }

export default Contact