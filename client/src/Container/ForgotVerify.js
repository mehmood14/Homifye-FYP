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
import url from "url";
import "./ForgotVerify.css";

export default class ForgotVerify extends Component {
  state = {
    newpassword: "",
    invalidNewPassword: false,
  };

  fields = (e) => {
    this.setState({ newpassword: e.target.value });
    this.setState({ invalidNewPassword: false });
  };

  forgetVerify = () => {
    if (
      this.state.newpassword !== null &&
      this.state.newpassword !== undefined &&
      this.state.newpassword !== ""
    ) {
    } else {
      this.setState({ invalidNewPassword: true });
    }

    if (this.state.newpassword.length >= 8) {
    } else {
      alert("Password must be 8 words");
    }

    if (!this.state.invalidPassword) {
      const urlObj = url.parse(document.location.href, true);

      axios({
        method: "post",
        url:
          "http://127.0.0.1:3000/users/changePass/" +
          urlObj.query.id +
          "/" +
          urlObj.query.code,
        data: {
          newpassword: this.state.newpassword,
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
      <div className="backgroundforgotnew">
        <div className="pageforgotnew">
          <div className="formdivforgotnew">
            <Form className="formforgotnew">
              <FormGroup>
                <Label for="exampleNewPassword">New Password</Label>
                <Input
                  type="password"
                  name="new password"
                  id="exampleNewPassword"
                  placeholder="password placeholder"
                  onChange={this.fields}
                  invalid={this.state.invalidNewPassword}
                />
                <FormFeedback invalid={this.state.invalidNewPassword}>
                  Password is missing
                </FormFeedback>
              </FormGroup>
              <Button onClick={this.forgetVerify} className="btnforgotnew">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
