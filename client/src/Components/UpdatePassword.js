import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import "./Profile.css";
import axios from "axios";

export default class LeftUpdatePassword extends Component {
  state = {
    oldpassword: "",
    newpassword: "",
    invalidoldPassword: false,
    invalidnewPassword: false,
  };

  fields = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ invalidoldPassword: false });
    this.setState({ invalidnewPassword: false });
  };

  savebtnn = () => {
    const token = localStorage.getItem("token");

    if (
      this.state.oldpassword !== null &&
      this.state.oldpassword !== undefined &&
      this.state.oldpassword !== ""
    ) {
    } else {
      console.log("Old Password required");
      this.setState({ invalidoldPassword: true });
    }

    if (this.state.oldpassword.length >= 8) {
    } else {
      alert("Password must be 8 words");
    }

    if (
      this.state.newpassword !== null &&
      this.state.newpassword !== undefined &&
      this.state.newpassword !== ""
    ) {
    } else {
      console.log("New Password required");
      this.setState({ invalidnewPassword: true });
    }

    if (this.state.newpassword.length >= 8) {
    } else {
      alert("Password must be 8 words");
    }

    if (!this.state.invalidoldPassword && !this.state.invalidnewPassword) {
      axios({
        method: "post",
        headers: {
          token: token,
        },
        url: "http://127.0.0.1:3000/users/newProfilePassword",
        data: {
          oldpassword: this.state.oldpassword,
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
      console.log("npp");
    }
  };

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="exampleOldPassword">Old Password</Label>
            <Input
              type="password"
              name="oldpassword"
              id="exampleOldPassword"
              placeholder="Enter Old password"
              onChange={this.fields}
              invalid={this.state.invalidoldPassword}
            />
            {
              <FormFeedback invalid={this.state.invalidoldPassword}>
                Old Password is missing
              </FormFeedback>
            }
          </FormGroup>
          <FormGroup>
            <Label for="exampleNewPassword">New Password</Label>
            <Input
              type="password"
              name="newpassword"
              id="exampleNewPassword"
              placeholder="Enter new password"
              value={this.state.newpassword}
              onChange={this.fields}
              invalid={this.state.invalidnewPassword}
            />
            {
              <FormFeedback invalid={this.state.invalidnewPassword}>
                new Password is missing
              </FormFeedback>
            }
          </FormGroup>
          <Button onClick={this.savebtnn}>Save</Button>
        </Form>
      </div>
    );
  }
}
