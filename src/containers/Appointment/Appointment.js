import React, {useEffect, useState} from 'react';
import { Grid, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import {Helmet} from "react-helmet";
import axios from 'axios';

const useStyles = makeStyles(() => ({
    mainGrid: {
        marginTop: '3vh',
        marginLeft: '20%',
        marginRight: '20%',
        flexBasis: 'inherit',
    },
    Button: {
       zIndex: 2
    }
}));

function Appointment(){
    const [users, setUser] = useState([{name: "Wei", phone: "6475556666", service: "Pedicure", time: "2020-10-02 11:30AM"}])

    const classes = useStyles();


    useEffect(() =>  {    
        async function getData(){
            var data = await axios({
                method: 'GET',
                url: 'http://localhost:8000/appointments',
                setTimeout: 5000,
            })
              
            setUser(data.data);
        }
        getData();
    },[])



    function onClickCancel(user) {
        let result = window.confirm("Are you sure you want to remove this appointment?");
        if(result){
            let newArr = users.filter(e=> e !== user);
            console.log(newArr)
            setUser([...newArr]);
        }
    };


    return (
        <Grid className={classes.mainGrid}>

            <Helmet>
                <title>
                    Appointment
                </title>
            </Helmet>

            <Grid container spacing={1}>
                {users.map(u => (
                    <React.Fragment>
                    <Grid item xs={12}>
                        <Paper>
                            <Grid container>
                                    
                                <Grid item xs={10}>
                                    <Typography>
                                        {u.name}
                                    </Typography>

                                    <Typography>
                                        {u.phone}
                                    </Typography>
                                    
                                    <Typography>
                                        {u.service}
                                    </Typography>
                                    
                                    <Typography>
                                        {u.time}
                                    </Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Button color="secondary" onClick={()=>{onClickCancel(u)}}>Delete</Button>
                                    <Button color="primary">Edit</Button>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                        
                    </React.Fragment>
                ))}

            </Grid>
        </Grid>
    )
}

export default Appointment;