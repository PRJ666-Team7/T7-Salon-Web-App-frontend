import React from 'react'
import {Grid, makeStyles, Paper} from '@material-ui/core';
import useWindowDimensions from '../../helpers/windowDimensions'

const useStyles = makeStyles(theme => ({
    Window: {
        marginBottom: "10%",
        padding: theme.spacing(6),
        borderRadius: theme.spacing(2),
        maxWidth: "400px"
    },
}));

export default function(props) {
    const { height, width } = useWindowDimensions();
    const classes = useStyles();

    return (
        <Grid container alignItems={width >= 630 ? "center" : "flex-start"} justify="center">
            {width >= 630 ? 
                <Paper className={classes.Window} elevation={5}>
                    {props.children}
                </Paper> :
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            }
        </Grid>
    )
}
