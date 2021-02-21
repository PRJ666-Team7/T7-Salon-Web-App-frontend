import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, Typography, IconButton, AppBar, Toolbar} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MenuIcon from '@material-ui/icons/Menu';
import breakpointHelper from '../../helpers/breakpointHelper'

const useStyles = makeStyles(theme => ({
    Nav: {
        margin: theme.spacing(4),
    },
    Title: {
        background: "#008cff",
        fontSize: theme.spacing(4),
        margin: theme.spacing(1, 1, 1, 1),
        borderRadius: theme.spacing(2),
        padding: theme.spacing(0, 1),
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: "2px",
        minWidth: "340px",
        maxWidth: "340px"
    },
    SmallerTitle: {
        fontSize: "21px",
        minWidth: "100px",
        maxWidth: "230px !important"
    },
    HeaderColor: {
        background: "#dae8fc",
        padding: "0px",
        position: "fixed",
    },
    NavButton: {
        height: theme.spacing(6),
        borderRadius: theme.spacing(1),
        width: theme.spacing(16),
        margin: theme.spacing(2),
        textTransform: "none",
        whiteSpace: "nowrap",
        background: "#f1f2f4",
        "&:hover": {
            background: "#f1f2f4",
        },
        color: "black !important",
    },
    NavButtonActive: {
        background: "#1ba0e2 !important",
    },
    Content: {
        minHeight: "92vh"
    },
    Footer: {
        borderStyle: "solid",
        borderWidth: "2px 0px 0px 0px",
        borderColor: "#cccccc",
        height: "100%"
    },
    FooterItems: {
        paddingTop: theme.spacing(1),
        minWidth: "250px"
    },
    Copyright: {
        color: '#1e7acf',
        borderStyle: 'solid',
        borderColor: '#cccccc',
        borderWidth: "1px",
        padding: theme.spacing(1, 7),
    },
    Promotional: {
        color: 'black',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: "2px",
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1, 7),
        textTransform: 'none'
    },
    IconButton: {
        color: 'black',    
        padding: "6px",
        margin: theme.spacing(1)
    },
    Twitter: {
        color: 'black',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: "2px",
    },
    FacebookIconSize: {
        fontSize: 35
    },
    TwitterIconSize: {
        fontSize: 30
    }
}));

export default function(props) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const classes = useStyles();
    const currentRoute = useHistory().location.pathname.toLowerCase();

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log("window.innerHeight", window.innerWidth)
    console.log("innerWidth", windowDimensions)

    return (
        <Grid container justify="center" style={{minHeight: '100vh'}}>
            <Grid container className={classes.HeaderColor} container justify="flex-start" alignItems="center" {...breakpointHelper.full}>
                {windowDimensions.width >= 1020 ? (
                    <React.Fragment>
                        <Grid {...breakpointHelper.third}>
                            <Typography className={classes.Title} >
                                Sherry's Nails and Spa
                            </Typography>
                        </Grid>
                        <Grid {...breakpointHelper.twoThird}>
                            <Grid container justify="center">
                                <Button className={currentRoute == '/' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained" color="primary" href="/">
                                    Home
                                </Button>
                                <Button className={currentRoute == '/booking' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained" color="primary" href="/booking">
                                    Book Appointment
                                </Button>
                                <Button className={currentRoute == '/about' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained" color="primary" href="/about">
                                    About Us
                                </Button>
                                <Button className={currentRoute == '/contact' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained" color="primary" href="/contact">
                                    Contact Us
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                ) : (
                    <AppBar className={classes.HeaderColor}>
                        <Toolbar>
                            <Grid container {...breakpointHelper.full}>
                                <Grid {...breakpointHelper.threeQuarter}>
                                    <Typography className={windowDimensions.width >= 520 ? classes.Title : `${classes.Title} ${classes.SmallerTitle}`} >
                                        Sherry's Nails and Spa
                                    </Typography>
                                </Grid>
                                <Grid {...breakpointHelper.quarter}>
                                    <Grid container justify="flex-end" alignItems="center" style={{height: "100%"}}>
                                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                            <MenuIcon style={{color: "grey", fontSize: 30}}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                )}
            </Grid>
                    
            <Grid container className={classes.Content} justify="center">
                {props.children}
            </Grid>

            <Grid 
                container 
                justify="center" 
                alignItems="center" 
                className={classes.Footer} 
                style={{minHeight: '8vh'}}
                direction={windowDimensions.width > 1000 ? "row" : "column"}
            >
                <Grid container justify="center" {...breakpointHelper.third} className={classes.FooterItems}>
                    <Typography className={classes.Copyright}>
                        Copyright © 2021 T7
                    </Typography>
                </Grid>

                <Grid container justify="center" {...breakpointHelper.third} className={classes.FooterItems}>
                    <Button className={classes.Promotional}>
                        Subscribe to our promotional emails
                    </Button>
                </Grid>

                <Grid container justify="center"{...breakpointHelper.third} className={classes.FooterItems}>
                    <IconButton className={classes.IconButton} href="https://www.facebook.com/">
                        <FacebookIcon className={classes.FacebookIconSize}/>
                    </IconButton>
                    <IconButton className={`${classes.IconButton} ${classes.Twitter}`} href="https://twitter.com/home">
                        <TwitterIcon className={classes.TwitterIconSize}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    )
}
