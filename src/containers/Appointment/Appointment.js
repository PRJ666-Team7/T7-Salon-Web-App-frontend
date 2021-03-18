import React from 'react';
import { Grid, Paper, Typography, Button, Box, makeStyles } from '@material-ui/core';
import {Helmet} from "react-helmet";

const useStyles = makeStyles(() => ({
    Button: {
       zIndex: 2
    }
}));

function Appointment(){

    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Helmet>
                <title>Appointment</title>
            </Helmet>

            <Grid item xs={9}>
                <Box p={{xs:4, sm:4}}>
                    <Paper>
                        <Typography>
                            Customer Name: Random Name
                        </Typography>
                        <Typography>
                            Customer Phone Number: 647-555-1111
                        </Typography>
                        <Typography>
                            Service: Pedicure
                        </Typography>
                        <Typography>
                            Date and Time: 2020-10-02 11:30AM
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box p={{xs:3, sm:4}}>
                    <Button color="secondary">Delete</Button>
                    <Button color="primary">Edit</Button>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box p={{xs:4, sm:4}}>
                    <Paper>
                        <Typography>
                            Customer Name: Random Name
                        </Typography>
                        <Typography>
                            Customer Phone Number: 647-555-1111
                        </Typography>
                        <Typography>
                            Service: Pedicure
                        </Typography>
                        <Typography>
                            Date and Time: 2020-10-02 11:30AM
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box p={{xs:3, sm:4}}>
                    <Button color="secondary">Delete</Button>
                    <Button color="primary">Edit</Button>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box p={{xs:4, sm:4}}>
                    <Paper>
                        <Typography>
                            Customer Name: Random Name
                        </Typography>
                        <Typography>
                            Customer Phone Number: 647-555-1111
                        </Typography>
                        <Typography>
                            Service: Pedicure
                        </Typography>
                        <Typography>
                            Date and Time: 2020-10-02 11:30AM
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box p={{xs:3, sm:4}}>
                    <Button color="secondary">Delete</Button>
                    <Button color="primary">Edit</Button>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box p={{xs:4, sm:4}}>
                    <Paper>
                        <Typography>
                            Customer Name: Random Name
                        </Typography>
                        <Typography>
                            Customer Phone Number: 647-555-1111
                        </Typography>
                        <Typography>
                            Service: Pedicure
                        </Typography>
                        <Typography>
                            Date and Time: 2020-10-02 11:30AM
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box p={{xs:3, sm:4}}>
                    <Button color="secondary">Delete</Button>
                    <Button color="primary">Edit</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Appointment;