import React, { Component } from 'react'
import {Grid, Typography, withStyles, Paper, TextField} from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'

const Window = withStyles((theme) => ({
    root: {
        marginBottom: "10%",
        padding: theme.spacing(6),
        borderRadius: theme.spacing(2),
        maxWidth: "400px"
    }
 }))(Paper);

 const Title = withStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
        fontSize: "25px"
    }
 }))(Typography);

export class Contact extends Component {
    render() {
        return (
            <Grid container>
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
                    </Grid>
                </MobileWindow>
            </Grid>
            )
        }
    }

export default Contact