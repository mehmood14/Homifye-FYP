import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import "./ForgotPass.css";

export default class ForgotPass extends Component {
  state = {
    username: "",
    invalidUsername: false,
  };

  fields = (e) => {
    this.setState({ username: e.target.value });
    this.setState({ invalidUsername: false });
  };

  ValidateUsername = () => {
    const un = /^[a-z0-9_-]{6,16}$/gim;
    return un.test(this.state.username);
  };

  forgot = () => {
    if (
      this.state.username !== null &&
      this.state.username !== undefined &&
      this.state.username !== ""
    ) {
    } else {
      this.setState({ invalidUsername: true });
    }
    if (this.ValidateUsername(this.state.username)) {
    } else {
      alert("In correct username format");
    }
    if (!this.state.invalidUsername) {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/users/forgot",
        data: {
          username: this.state.username,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("err::", err);
        });
    } else {
      console.log("ok");
    }
  };

  render() {
    return (
      <div className="backgroundforgot">
        <div className="pageforgot">
          <div className="formdivforgot">
            <Form className="formforgot">
              <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input
                  type="username"
                  name="username"
                  id="exampleUsername"
                  placeholder="Enter Usernamer"
                  onChange={this.fields}
                  invalid={this.state.invalidUsername}
                />
                <FormFeedback invalid={this.state.invalidUsername}>
                  Username is missing
                </FormFeedback>
              </FormGroup>
              <Button onClick={this.forgot} className="forgot">
                ok
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
