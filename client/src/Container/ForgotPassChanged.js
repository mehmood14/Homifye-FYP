import React, { Component } from "react";
import "./UserVerified.css";
import { Button, Form } from "reactstrap";

class ForgotPassChanged extends Component {
  homelogin = () => {
    const { history } = this.props;
    history.push("/login");
  };
  render() {
    return (
      <div className="backgroundloginhome">
        <div className="pageloginhome">
          <div className="loginformdiv">
            <Form className="homeloginform">
              <h2>Password updated</h2>
              <div className="btndont">
                <Button onClick={this.homelogin} className="btnhomelogin">
                  Click here to LOGIN !
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassChanged;
