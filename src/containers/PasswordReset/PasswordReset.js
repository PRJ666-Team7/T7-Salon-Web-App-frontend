import React, { Component } from 'react'
import {Grid, Typography, withStyles, TextField, Button} from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'
import {Helmet} from "react-helmet";

 const Title = withStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
        fontSize: "25px"
    }
 }))(Typography);

export class ForgotPassword extends Component {
    render() {
        return (
            <Grid container>
                <Helmet>
                    <title>Password Reset</title>
                </Helmet>
                <MobileWindow elevation={5}>
                    <Grid container justify="center" {...breakpointHelper.full}>
                        <Grid container justify="center" {...breakpointHelper.full}>
                            <Grid {...breakpointHelper.full}>
                                <Grid container justify="center">
                                    <Title>
                                        Reset Password
                                    </Title>
                                </Grid>
                            </Grid>
                            <Typography>
                                Enter a new password
                            </Typography>
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
                        
                        <Grid container justify="center" {...breakpointHelper.full} style={{paddingTop: "20px"}}>
                            <Button variant="contained">
                                Reset Password
                            </Button>
                        </Grid>
                    </Grid>
                </MobileWindow>
            </Grid>
            )
        }
    }

export default ForgotPassword