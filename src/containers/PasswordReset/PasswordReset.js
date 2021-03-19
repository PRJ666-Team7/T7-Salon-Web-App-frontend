import React, { Component } from 'react'
import { Grid, Typography, withStyles, TextField, Button, Dialog, DialogContent, Slide, DialogTitle } from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import MobileWindow from '../../components/UI/MobileWindow/MobileWindow'
import { Helmet } from "react-helmet";
import axois from '../../components/helpers/axios'
import queryString from 'query-string';
import { Alert } from '@material-ui/lab';

const Title = withStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1),
        fontSize: "25px"
    }
}))(Typography);

const TextInput = withStyles((theme) => ({
    root: {
        maxWidth: "230px"
     }
 }))(TextField);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ForgotPassword() {
    const [value, setValue] = React.useState({password: '', password2: ''});
    const [error, setError] = React.useState({password: '', password2: ''});
    const [serverError, setServerError] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        let valid = true;
        let errors = { email: ''}

        if (!passwordRegex.test(String(value.password).toLowerCase())) {
            errors.password= "Password must be 8 characters with at least one letter, number and special character"
            valid = false;
        } else if (!value.password.length > 0){
            errors.password= "Password is required"
            valid = false;
        } else if (value.password.length > 30){
            errors.password= "Password must be between 8 - 30"
            valid = false;
        } else {
            errors.password= ""
        }

        if (value.password != value.password2) {
            errors.password2= "Password do not match"
            valid = false;
        } else if (!value.password2.length > 0){
            errors.password2= "Confirm password is required"
            valid = false;
        } else {
            errors.password2= ""
        }

        setError(errors)

        if (valid) {
            const resetHash = queryString.parse(window.location.search)

            axois.post('/passwordReset', { password: value.password, passwordHash: resetHash.passwordHash })
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
        if(event.keyCode == 13){
            handleSubmit()
        }
    }

    const handleClose = () => {
        setOpen(false);
        window.location = "/login"
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
                <title>Password Reset</title>
            </Helmet>

            <Dialog TransitionComponent={Transition} onClose={handleClose} open={open}>
                <DialogTitle id="alert-dialog-slide-title">Success</DialogTitle>
                <DialogContent>
                    Password has successfully reset 
                    You will be redirected to login on click
                </DialogContent>
            </Dialog>

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

                    {serverError && <Alert severity="error" onClose={() => setServerError(false)}>Invalid </Alert>}

                    <Grid container justify="center" {...breakpointHelper.full} style={{ paddingTop: "20px" }}>
                        <TextInput
                           id="password"
                           label="Password"
                           variant="outlined"
                           onChange={handleChange}
                           error={error.password != ''}
                           helperText={error.password}
                           type="password"
                           onKeyDown={keyPress}
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
