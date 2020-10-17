import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    showAlert: false,
  };

  fields = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  ValidateUsername = () => {
    const un = /^[a-z0-9_-]{6,16}$/gim;
    return un.test(this.state.username);
  };

  login = () => {
    if (
      this.state.username !== null &&
      this.state.username !== undefined &&
      this.state.username !== ""
    ) {
      if (
        this.state.password !== null &&
        this.state.password !== undefined &&
        this.state.password !== ""
      ) {
        if (this.state.password.length >= 8) {
          axios({
            method: "post",
            url: "http://127.0.0.1:3000/userLogin",
            data: {
              username: this.state.username,
              password: this.state.password,
            },
          })
            .then((res) => {
              if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                window.location.href = "/dashboard";
              }
            })
            .catch((err) => {
              console.log("err::", err);
              this.setState({
                alertMessage: "Incorect email or password. Please try again",
                showAlert: true,
              });
            });
        } else {
          this.setState({
            alertMessage: "Password must be 8 words.",
            showAlert: true,
          });
        }
      } else {
        this.setState({
          alertMessage: "Please enter a valid password",
          showAlert: true,
        });
      }
    } else {
      this.setState({
        alertMessage: "Please enter a valid username.",
        showAlert: true,
      });
    }
  };

  render() {
    return (
      <div className="backgroundlogin">
        <div className="pagelogin">
          <div className="formdivlogin">
            <Form className="formlogin">
              <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input
                  type="username"
                  name="username"
                  id="exampleUsername"
                  placeholder="with a placeholder"
                  onChange={this.fields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password placeholder"
                  onChange={this.fields}
                />
              </FormGroup>
              {this.state.showAlert === true ? (
                <Alert
                  severity="error"
                  style={{
                    color: "white",
                    fontSize: "11px",
                    height: "26px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    padding: "0",
                    marginTop: "-5px",
                    marginBottom: "10px",
                  }}
                >
                  {this.state.alertMessage}
                </Alert>
              ) : null}
              <Button onClick={this.login} className="btnlogin">
                Submit
              </Button>
              <Link to="/forgotpass" className="forgotloginn">
                Forgot Password ?
              </Link>
              <Link to="/signup" className="forgotloginn">
                Not a member ?
              </Link>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
