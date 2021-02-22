import React, { Component } from 'react'
import { Grid, Typography, withStyles } from '@material-ui/core';
import breakpointHelper from '../../components/helpers/breakpointHelper'
import {Helmet} from "react-helmet";

const Header = withStyles((theme) => ({
    root: {
        fontSize: "25px",
        fontWeight: "bold",
    }
}))(Typography);

const Content = withStyles((theme) => ({
    root: {
        margin: theme.spacing(1, 3)
    }
}))(Typography);

export class About extends Component {
    render() {
        return (
            <Grid>
                <Helmet>
                    <title>About Us</title>
                </Helmet>

                <Grid container justify="center">
                    <Grid container justify="center" {...breakpointHelper.full}>
                        <Header>
                            About the Store
                            </Header>
                    </Grid>
                    <Grid item={true} xs={11} sm={9} md={6} lg={4} xl={4}>
                        <Typography >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </Typography>
                    </Grid>

                    <Grid container justify="center" {...breakpointHelper.full}>
                        <Header style={{paddingTop: "20px"}}>
                            Who We Are
                        </Header>
                    </Grid>

                    <Grid item={true} xs={11} sm={11} md={4} lg={3} xl={3}>
                        <Content >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </Content>
                    </Grid>
                    <Grid item={true} xs={11} sm={11} md={4} lg={3} xl={3}>
                        <Content >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </Content>
                    </Grid>
                    <Grid item={true} xs={11} sm={11} md={4} lg={3} xl={3}>
                        <Content >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </Content>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default About
