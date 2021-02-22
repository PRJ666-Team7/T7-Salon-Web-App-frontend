import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, Typography, List, ListItem, ListItemText, Divider, MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import ImageSlider from './ImageSlider/ImageSlider.js';
import GoogleReview from './GoogleReview/GoogleReview.js'
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles(theme => ({ 
    bodyGrid: {
        background: "#ffffff",
        padding: "45px",
    },
    itemGrid: {
    },
    subHead: {
        paddingBottom: theme.spacing(3),
        background: "#3f51b5",
        color: "#ffffff",
    },
    paper: {
        backgroundColor: "#b1ddf0",
        fontSize: theme.spacing(4),
        color: "#000000",
        textAlign: "center",
    },
    promotes: {
        textAlign: "center",
    }, 
    paperButton: {
        backgroundColor: "#b1ddf0",
        height: theme.spacing(20),
        textAlign: "center",
    },
    aptButton: {
        top: "30%",
        fontSize: theme.spacing(2),
        color: "#ffffff",
        height: theme.spacing(8),
    },
    list: {
        alignContent: "center",
        top: "25%",
    },

}));

export default function Home() {
    const classes = useStyles();
    const history = useHistory();

    let theme = createMuiTheme();
    theme = responsiveFontSizes(theme);

    return (
        <MuiThemeProvider theme={theme}>
        <Grid container justify="center" spacing={2} className={classes.bodyGrid}>
            <Helmet>
                <title>Home</title>
            </Helmet>
                
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.itemGrid}> 
                <Paper className={classes.paper} styles={{paddingLeft: "10px", paddingRight: "10px"}}>
                    <ImageSlider />
                </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.itemGrid}> 
                <Paper className={classes.paper} >
                    <List className={classes.list}>
                        
                    <ListItem className={classes.subHead} > 
                        <ListItemText>
                            <Typography variant="h4" className={classes.promotes}>
                                Special Deals
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    
                    <Divider component="li" />

                    <ListItem alignItems="flex-start">
                        <ListItemText>
                            <Typography variant="h5"  className={classes.promotes} >
                                    $5 dollars off when purchasing both Manicure and Pedicure services.
                            </Typography>
                        </ListItemText>
                    </ListItem>

                    <Divider component="li" />

                    <ListItem alignItems="flex-start">
                     <ListItemText>
                        <Typography variant="h5"  className={classes.promotes} >     
                            Free regular Manicure after 6 visits that are over $30 dollars.
                        </Typography>
                     </ListItemText>
                    </ListItem>

                    </List>
                </Paper>
            </Grid>

            <Grid item xs={12} className={classes.itemGrid}>
                <Paper className={classes.paperButton}>
                <Button variant="contained" color="primary" size="lg" className={classes.aptButton} onClick={()=> history.push("/booking")}>
                    Book Appointment
                </Button>
                </Paper>
            </Grid>

            <Grid item xs={12} className={classes.itemGrid}> 
                <Paper className={classes.paper} >
                    <GoogleReview />
                </Paper>
            </Grid>
            
        </Grid>
        </MuiThemeProvider>
    );

}

