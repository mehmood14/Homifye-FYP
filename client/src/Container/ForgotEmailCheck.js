import React, { Component } from "react";
import "./EmailCheck.css";
import { Form } from "reactstrap";

export class ForgotEmailCheck extends Component {
  render() {
    return (
      <div className="backgroundloginhome">
        <div className="pageloginhome">
          <div className="loginformdiv">
            <Form className="homeloginform">
              <h2>Email Sent</h2>
              <h6>Check your Email to update your password</h6>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
