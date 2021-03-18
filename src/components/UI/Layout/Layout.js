import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {Grid, Button, Typography, IconButton, AppBar, Toolbar, makeStyles, Menu, MenuItem, ButtonBase } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MenuIcon from '@material-ui/icons/Menu';
import breakpointHelper from '../../helpers/breakpointHelper'
import Cookies from 'js-cookie';

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
        minWidth: "360px",
        maxWidth: "360px",
        color: "white"
    },
    SmallerTitle: {
        fontSize: "21px",
        minWidth: "150px",
        maxWidth: "250px !important"
    },
    HeaderColor: {
        background: "#dae8fc",
        padding: "0px",
        position: "fixed",
        zIndex: 99
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
        minHeight: "92vh",
        marginTop: "10vh"
    },
    MobileContent: {
        minHeight: "88vh",
        marginTop: "10vh"
    },
    Footer: {
        borderStyle: "solid",
        borderWidth: "2px 0px 0px 0px",
        borderColor: "#cccccc",
        height: "100%"
    },
    FooterItems: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
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
    },
    UserGreeting: {
        position: 'absolute',
        top: '80px',
        right: '10px',
        color: '#3b3b3b'
    }
}));

export default function(props) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const currentRoute = useHistory().location.pathname.toLowerCase();
    const user = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
    };

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    function signOut() {
        Cookies.remove("jwt")
        Cookies.remove("user")
        window.location = "/login"
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Grid container style={{minHeight: '100vh'}} direction="column" >
            <Grid container className={classes.HeaderColor} container justify="flex-start" alignItems="center" {...breakpointHelper.full}>
                {windowDimensions.width >= 1330 ? (
                    <React.Fragment>
                        <Grid {...breakpointHelper.third}>
                            <ButtonBase onClick={() => window.location.href="/"}>
                                <Typography className={classes.Title} >
                                    Sherry's Nails and Spa
                                </Typography>
                            </ButtonBase>
                        </Grid>
                        <Grid {...breakpointHelper.twoThird}>
                            <Grid container justify="center">
                                <Button className={currentRoute == '/' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained" href="/">
                                    Home
                                </Button>
                                <Button className={currentRoute == '/booking' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained" href="/booking">
                                    Book Appointment
                                </Button>
                                <Button className={currentRoute == '/about' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained"  href="/about">
                                    About Us
                                </Button>
                                <Button className={currentRoute == '/contact' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained"  href="/contact">
                                    Contact Us
                                </Button>
                                { Cookies.get('jwt') ?
                                <Button className={currentRoute == '/login' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained" onClick={signOut}>
                                    Sign Out
                                </Button> :
                                <Button className={currentRoute == '/login' ? `${classes.NavButton} ${classes.NavButtonActive}` : classes.NavButton} variant="contained" href="/login">
                                    Login
                                </Button>
                                }
                            </Grid>
                        </Grid>
                    </React.Fragment>
                ) : (
                    <AppBar className={classes.HeaderColor}>
                        <Toolbar>
                            <Grid container {...breakpointHelper.full}>
                                <Grid {...breakpointHelper.threeQuarter}>
                                    <ButtonBase onClick={() => window.location.href="/"}>
                                        <Typography className={windowDimensions.width >= 520 ? classes.Title : `${classes.Title} ${classes.SmallerTitle}`} >
                                            Sherry's Nails and Spa
                                        </Typography>
                                    </ButtonBase>
                                </Grid>
                                <Grid {...breakpointHelper.quarter}>
                                    <Grid container justify="flex-end" alignItems="center" style={{height: "100%"}}>
                                        <IconButton onClick={handleClick} className={classes.menuButton} >
                                            <MenuIcon style={{color: "grey", fontSize: 30}}/>
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            >
                                            <MenuItem onClick={() => window.location.href="/booking"}>Booking</MenuItem>
                                            <MenuItem onClick={() => window.location.href="/about"}>About</MenuItem>
                                            <MenuItem onClick={() => window.location.href="/contact"}>Contact</MenuItem>
                                            { Cookies.get('jwt') ?
                                                <MenuItem onClick={signOut}>Sign Out</MenuItem> :
                                                <MenuItem onClick={() => window.location.href="/login"}>Login</MenuItem>
                                            }
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                )}
            </Grid>
            
            {user && <Typography className={classes.UserGreeting}>Hello, {user.fname}</Typography>}

            <Grid container className={windowDimensions.width >= 960 ? classes.Content : classes.MobileContent} justify="center" {...breakpointHelper.full} >
                {props.children}
            </Grid>

            <Grid 
                container 
                justify="center" 
                alignItems="center" 
                className={classes.Footer} 
                style={{minHeight: '8vh'}}
            >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.FooterItems}>
                    <Grid container justify="center">
                        <Typography className={classes.Copyright}>
                            Copyright © 2021 T7
                        </Typography>
                    </Grid>
                </Grid>
{/* 
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.FooterItems}>
                    <Grid container justify="center">
                        <Button className={classes.Promotional}>
                            Subscribe to our promotional emails
                        </Button>
                    </Grid>
                </Grid> */}

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.FooterItems}>
                    <Grid container justify="center">
                        <IconButton className={classes.IconButton} href="https://www.facebook.com/">
                            <FacebookIcon className={classes.FacebookIconSize}/>
                        </IconButton>
                        <IconButton className={`${classes.IconButton} ${classes.Twitter}`} href="https://twitter.com/home">
                            <TwitterIcon className={classes.TwitterIconSize}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
