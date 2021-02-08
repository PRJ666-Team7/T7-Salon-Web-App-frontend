import React from 'react'
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    Nav: {
        margin: theme.spacing(4),
    }
}));

export default function(props) {
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid container justify="center">
                <h2>Sherry's Nails and Spa</h2>
                <NavLink className={classes.Nav} to="/" ld={12}>
                    Home
                </NavLink>
                <NavLink className={classes.Nav} to="/booking" >
                    Book Appointment
                </NavLink>
                <NavLink className={classes.Nav} to="/about" >
                    About Us
                </NavLink>
                <NavLink className={classes.Nav} to="/contact" >
                    Contact Us
                </NavLink>
            </Grid>
            <Grid>
                {props.children}
            </Grid>
        </Grid>
    )
}
