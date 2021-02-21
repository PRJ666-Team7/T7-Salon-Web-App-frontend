import React, { Component } from 'react'
import {Grid, Typography, withStyles, TextField, Button} from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'

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
                <MobileWindow elevation={5}>
                    <Grid container justify="center" {...breakpointHelper.full}>
                        <Grid container justify="center" {...breakpointHelper.full}>
                            <Grid {...breakpointHelper.full}>
                                <Grid container justify="center">
                                    <Title>
                                        Password Recovery
                                    </Title>
                                </Grid>
                            </Grid>
                            <Typography>
                                Enter your email to reset your password
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