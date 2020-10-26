import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import url from "url";
import "./ForgotChangePass.css";

export default class ForgotChangePass extends Component {
  state = {
    newpassword: "",
  };

  fields = (e) => {
    this.setState({ newpassword: e.target.value });
  };

  forgetVerify = () => {
    if (
      this.state.newpassword !== null &&
      this.state.newpassword !== undefined &&
      this.state.newpassword !== ""
    ) {
      if (this.state.newpassword.length >= 8) {
        const urlObj = url.parse(document.location.href, true);
        const { history } = this.props;

        axios({
          method: "post",
          url: "http://127.0.0.1:3000/forgotChangePass/" + urlObj.query.id,
          data: {
            newpassword: this.state.newpassword,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              history.push("/passchanged");
            }
          })
          .catch((err) => {
            console.log("err::", err);
          });
      } else {
        console.log("pass 8 must");
      }
    } else {
      console.log("invalid pass");
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
                />
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
