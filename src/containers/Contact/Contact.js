import React from 'react';
import GoogleMap from '../GoogleMap/GoogleMap';
import { Grid, Paper, Box, Typography, makeStyles, createMuiTheme, responsiveFontSizes, MuiThemeProvider} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import {Helmet} from "react-helmet";

const useStyles = makeStyles(() => ({
    Paper: {
        background: "#dae8fc"
    },

    Typography:{
        color: "#ffffff"
    }
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function Contact(){
    const classes = useStyles();

    return(
        <MuiThemeProvider theme={theme}>
        <Grid container>
            <Helmet>
                <title>Contacts</title>
            </Helmet>

            <Grid item xs={12}>
                <Box pt={5} pl={{ xs:1, sm:2, md:10 }} pr={{ xs:1, sm:2, md:10 }} pb={5}>
                    <Paper className={classes.Paper}>
                        <Box pl={{xs:1, sm:2}} pt={{xs:1, sm:2}}>
                            <Typography display="inline" variant="h4" className={classes.Typography}>Call Us</Typography>
                        </Box>
                        <Box p={{xs:1, sm:2}}>
                            <PhoneIcon fontSize="large" />
                                <Typography display="inline" variant="h4" className={classes.Typography}>  (647)346-9288</Typography>
                        </Box>
                    </Paper>
                </Box>
                <Box pl={{ xs:1, sm:2, md:10 }} pr={{ xs:1, sm:2, md:10 }} pb={5}>
                    <Paper className={classes.Paper}>
                        <Box pl={{xs:1, sm:2}} pt={{xs:1, sm:2}}>
                            <Typography display="inline" variant="h4" className={classes.Typography}>Our Location</Typography>
                        </Box>
                        <Box p={{xs:1, sm:2}}>
                            <BusinessIcon fontSize="large" />
                            <Typography display="inline" variant="h4" className={classes.Typography}>  58 Marine Parade Dr Unit 114, Etobicoke, ON M8V 4G1</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Grid>

            <Grid item xs={12} alignItems="center">
                <Box pl={{ xs:1, sm:2, md:10 }} pr={{ xs:1, sm:2, md:10 }} pb={5}>
                    <GoogleMap />
                </Box>
            </Grid>

        </Grid>
        </MuiThemeProvider>
    )
}

export default Contact;