import React, { Component } from 'react'
import About from './containers/About/About'
import Booking from './containers/Booking/Booking'
import Contact from './containers/Contact/Contact'
import Home from './containers/Home/Home'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

export class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/booking">
                    <Booking />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        )
    }
}

export default Routes
