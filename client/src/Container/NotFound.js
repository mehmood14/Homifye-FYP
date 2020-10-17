import React, { Component } from "react";
import "./NotFound.css";
import { Form } from "reactstrap";

export default class NotFound extends Component {
  render() {
    return (
      <div className="backgroundloginhome">
        <div className="pageloginhome">
          <div className="loginformdiv">
            <Form className="homeloginform">
              <h2>404 Page not found</h2>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
