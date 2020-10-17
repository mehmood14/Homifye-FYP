import React, { Component } from "react";
import "./EmailCheck.css";
import { Form } from "reactstrap";

export class EmailCheck extends Component {
  render() {
    return (
      <div className="backgroundloginhome">
        <div className="pageloginhome">
          <div className="loginformdiv">
            <Form className="homeloginform">
              <h2>User Registered</h2>
              <h6>Check your Email for verificaton</h6>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
