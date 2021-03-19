import React, { Component } from 'react'
import { Grid, Typography, withStyles, TextField, Button, Dialog, DialogContent, DialogTitle, Slide } from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'
import { Helmet } from "react-helmet";
import axois from '../../components/helpers/axios'
import { Alert } from '@material-ui/lab';

const Title = withStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
        fontSize: "25px"
    }
}))(Typography);

export default function ForgotPassword() {
    const [value, setValue] = React.useState({ email: '' });
    const [error, setError] = React.useState({ email: '' });
    const [serverError, setServerError] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let valid = true;
        let errors = { email: '' }

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

        setError(errors)

        if (valid) {
            axois.post('/passwordRecovery', { ...value })
                .then(function (response) {
                    if (response.data.status == "success") {
                        setOpen(true);
                    } else {
                        setServerError(true)
                    }
                })
        }
    };

    const keyPress = (event) => {
        if (event.keyCode == 13) {
            handleSubmit()
        }
    }

    const handleChange = (event) => {
        setValue({
            ...value,
            [event.target.id]: event.target.value
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
      
    return (
        <Grid container>
            <Helmet>
                <title>Forgot Recovery</title>
            </Helmet>


            <Dialog TransitionComponent={Transition} onClose={handleClose} open={open}>
                <DialogTitle id="alert-dialog-slide-title">Success</DialogTitle>
                <DialogContent>
                    Please check your email.
                </DialogContent>
            </Dialog>

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

                    {serverError && <Alert severity="error" onClose={() => setServerError(false)}>Invalid </Alert>}

                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextField
                          id="email"
                          label="Email"
                          variant="outlined"
                          onChange={handleChange}
                          error={error.email != ''}
                          helperText={error.email}
                          onKeyDown={keyPress}
                        />
                    </Grid>

                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Reset Password
                        </Button>
                    </Grid>
                </Grid>
            </MobileWindow>
        </Grid>
    )
}
