import React, { Component } from 'react'
import {Grid, Typography, withStyles, TextField, Button, ButtonBase} from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'
import {Helmet} from "react-helmet";

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

export class SignUp extends Component {
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
                                        Sign Up
                                    </Title>
                                </Grid>
                            </Grid>
                            <Typography>
                                Please fill in the form to create an account
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
                        <Grid container justify="center" {...breakpointHelper.full} style={{paddingTop: "20px"}}>
                            <TextField
                                id="filled-required"
                                label="Confirm password"
                                variant="outlined"
                                />
                        </Grid>
                        
                        <Grid container justify="center">
                            <Grid>
                                <ButtonBase onClick={() => window.location.href="/login"}>
                                    <LinkText>
                                        Already a member? Log In
                                    </LinkText>
                                </ButtonBase>
                            </Grid>
                        </Grid>

                        <Grid container justify="center" {...breakpointHelper.full} style={{paddingTop: "20px"}}>
                            <Button variant="contained">
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </MobileWindow>
            </Grid>
            )
        }
    }

export default SignUp