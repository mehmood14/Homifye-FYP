import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Container/Login";
import SignUp from "./Container/SignUp";
import NotFound from "./Container/NotFound";
import ForgotPass from "./Container/ForgotPass";
import HomeReg from "./Container/HomeReg";
import HomePage from "./Container/HomePage";
import HomeLogin from "./Container/HomeLogin";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import WithSidebar from "./Components/withSidebar";
import Approvals from "./Components/Approvals";
import UserVerified from "./Container/UserVerified";
import { EmailCheck } from "./Container/EmailCheck";
import { ForgotEmailCheck } from "./Container/ForgotEmailCheck";
import ForgotChangePass from "./Container/ForgotChangePass";
import ForgotPassChanged from "./Container/ForgotPassChanged";

import "./App.css";

class App extends Component {
  render() {
    return localStorage.getItem("token") !== null &&
      localStorage.getItem("userInfo") !== null ? (
      <Router>
        <Switch>
          <WithSidebar exact path="/dashboard" component={Dashboard} />
          <WithSidebar path="/profile" component={Profile} />
          <WithSidebar path="/approvals" component={Approvals} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    ) : (
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/homelogin" component={HomeLogin} />
        <Route path="/homereg" component={HomeReg} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/verify/" component={UserVerified} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/forgotpass" component={ForgotPass} />
        <Route path="/changepass/" component={ForgotChangePass} />
        <Route path="/mailcheck" component={EmailCheck} />
        <Route path="/forgotmail" component={ForgotEmailCheck} />
        <Route path="/passchanged" component={ForgotPassChanged} />
      </Router>
    );
  }
}

export default App;
