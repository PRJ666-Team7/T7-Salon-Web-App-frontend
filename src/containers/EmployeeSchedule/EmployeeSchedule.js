import React, { useEffect, useState } from 'react';
import { Typography, Container, CssBaseline, Avatar, Grid, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";
import Cookies from 'js-cookie';
import axois from '../../components/helpers/axios'
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    }
}));

function Scheduling() {
    const [serverError, setServerError] = React.useState(false);
    const [schedule, setSchedule] = React.useState([]);

    const classes = useStyles();
    const user = Cookies.get('user') && JSON.parse(Cookies.get('user'))

    useEffect(() => {
        const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : ""
        if (Cookies.get('jwt') == undefined || !user.isEmployee) {
            window.location = '/'
        } 

        const token = Cookies.get('jwt')
        axois.get('/getEmployeeSchedule', {
            headers: {
                authorization: `JWT ${token}`
            }
        })
            .then(function (response) {
                if (response.data.status == "success") {
                    setSchedule(response.data.schedule)
                    setServerError(false)
                } else {
                    setServerError(true)
                }
            })
    }, []);

    return (
        <Container component="main" maxWidth="sm">
            <Helmet>
                <title>Employee Schedule</title>
            </Helmet>

            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EventNoteIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ paddingBottom: "15px" }}>
                    Employee Schedule: {user.fname}
                </Typography>

                {serverError && <Alert severity="error" onClose={() => setServerError(false)}>Invalid </Alert>}

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Start Time</TableCell>
                                <TableCell align="right">End Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(schedule).map((i) => (
                                <TableRow key={schedule[i].date}>
                                    <TableCell> {schedule[i].date} </TableCell>
                                    <TableCell align="right">{schedule[i].start_time}</TableCell>
                                    <TableCell align="right">{schedule[i].end_time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    )
}


export default Scheduling;