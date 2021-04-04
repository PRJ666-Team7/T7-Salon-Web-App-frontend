import React, { Component } from 'react'
import About from './containers/About/About'
import Booking from './containers/Booking/Booking'
import Contact from './containers/Contact/Contact'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import ForgotPassword from './containers/ForgotPassword/ForgotPassword'
import PasswordReset from './containers/PasswordReset/PasswordReset'
import SignUp from './containers/SignUp/SignUp'
import Appointment from './containers/Appointment/Appointment'
import Service from './containers/Service/Service'


import UserAppointment from './containers/UserAppointment/UserAppointment'

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
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/forgotPassword">
                    <ForgotPassword />
                </Route>
                <Route path="/passwordReset">
                    <PasswordReset />
                </Route>
                <Route path="/signUp">
                    <SignUp />
                </Route>
                <Route path='/appointment'>
                    <Appointment />
                </Route>
                <Route path='/service'>
                    <Service />
                </Route>
<<<<<<< HEAD
                <Route path='/userappointment'>
                    <UserAppointment />
=======
                <Route path='/scheduling'>
                    <Scheduling />
>>>>>>> 0a519b0959c8ddf06929bf2f3467c7493b33840f
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        )
    }
}

export default Routes
