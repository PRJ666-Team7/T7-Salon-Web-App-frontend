import React from 'react'
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    Nav: {
        margin: theme.spacing(4),
    },
    Title: {
        background: "#008cff",
        fontSize: theme.spacing(5),
        margin: theme.spacing(1, 9, 1, 1),
        borderRadius: theme.spacing(2),
        padding: theme.spacing(0, 1),
        color: "#ffffff",
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: "2px",
    },
    HeaderColor: {
        background: "#dae8fc",
        padding: "0px",
        position: "fixed"
    },
    NavButton: {
        background: "#1ba0e2",
        height: theme.spacing(6),
        borderRadius: theme.spacing(1),
        width: theme.spacing(16),
        margin: theme.spacing(2),
        textTransform: "none",
        whiteSpace: "nowrap"
    },
    Content: {
        minHeight: "85vh"
    },
    Footer: {
        borderStyle: "solid",
        borderWidth: "2px 0px 0px 0px",
        borderColor: "#cccccc"
    }
}));

export default function(props) {
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid className={classes.HeaderColor} container justify="left" alignItems="center">
                <Typography className={classes.Title}>
                    Sherry's Nails and Spa
                </Typography>
                <Button className={classes.NavButton} variant="contained" color="primary" href="/">
                    Home
                </Button>
                <Button className={classes.NavButton} variant="contained" color="primary" href="/booking">
                    Book Appointment
                </Button>
                <Button className={classes.NavButton} variant="contained" color="primary" href="/about">
                    About Us
                </Button>
                <Button className={classes.NavButton} variant="contained" color="primary" href="/contact">
                    Contact Us
                </Button>
            </Grid>

            <Grid container className={classes.Content} justify="center">
                {props.children}
            </Grid>

            <Grid className={classes.Footer} container justify="center">
                footer
            </Grid>
        </Grid>
    )
}
