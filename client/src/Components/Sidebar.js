import React, { Component } from "react";
import "./sidebar.css";
import LineStyleIcon from "@material-ui/icons/LineStyle";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
// import AssessmentIcon from "@material-ui/icons/Assessment";
// import SettingsIcon from "@material-ui/icons/Settings";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  state = {
    activeOption: localStorage.getItem("activeOption"),
    logout: "",
  };

  Active = (e) => {
    this.setState({ activeOption: e }, () => {
      localStorage.setItem("activeOption", this.state.activeOption);
    });
  };

  Logout = (e) => {
    JSON.parse(localStorage.removeItem("token"));
    this.setState({ logout: e });
  };

  render() {
    return (
      <ul className="nav" data-color="green">
        <li
          onClick={() => this.Active("dashboard")}
          className={
            this.state.activeOption === "dashboard"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link className="nav-link" to="/dashboard">
            <i className="material-icons">
              <LineStyleIcon style={{ fontSize: 30 }} />
            </i>
            <p>Dashboard</p>
          </Link>
        </li>
        <li
          onClick={() => this.Active("profile")}
          className={
            this.state.activeOption === "profile"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link className="nav-link" to="/profile">
            <i className="material-icons">
              <AccountBoxIcon style={{ fontSize: 30 }} />
            </i>
            <p>User Profile</p>
          </Link>
        </li>

        <li
          onClick={() => this.Active("approval")}
          className={
            this.state.activeOption === "approval"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link className="nav-link" to="/approvals">
            <i className="material-icons">
              <CheckCircleIcon style={{ fontSize: 30 }} />
            </i>
            <p>Pending Approvals</p>
          </Link>
        </li>
        <li
          onClick={() => this.Logout("logout")}
          className={
            this.state.logout === "logout" ? "nav-item active" : "nav-item"
          }
        >
          <a className="nav-link" href="/homelogin">
            <i className="material-icons">
              <ExitToAppIcon style={{ fontSize: 30 }} />
            </i>
            <p>Logout</p>
          </a>
        </li>
      </ul>
    );
  }
}
