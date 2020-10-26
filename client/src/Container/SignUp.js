import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./SignUp.css";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

export default class SignUp extends Component {
  state = {
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    showAlert: false,
    alertMessage: "",
  };

  fields = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  ValidateUsername = () => {
    const un = /^[a-z0-9_-]{6,16}$/gim;
    return un.test(this.state.username);
  };

  validateEmail = () => {
    // eslint-disable-next-line
    const em = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(this.state.email);
  };

  signup = () => {
    if (
      this.state.name !== null &&
      this.state.name !== undefined &&
      this.state.name !== ""
    ) {
      if (
        this.state.email !== null &&
        this.state.email !== undefined &&
        this.state.email !== ""
      ) {
        if (this.validateEmail(this.state.email)) {
          if (
            this.state.username !== null &&
            this.state.username !== undefined &&
            this.state.username !== ""
          ) {
            if (this.ValidateUsername(this.state.username)) {
              if (
                this.state.password !== null &&
                this.state.password !== undefined &&
                this.state.password !== ""
              ) {
                if (this.state.password.length >= 8) {
                  if (
                    this.state.phone !== null &&
                    this.state.phone !== undefined &&
                    this.state.phone !== ""
                  ) {
                    if (this.state.phone.length === 11) {
                      const { history } = this.props;

                      axios({
                        method: "post",
                        url: "http://127.0.0.1:3000/registerUser",
                        data: {
                          name: this.state.name,
                          email: this.state.email,
                          username: this.state.username,
                          password: this.state.password,
                          phone: this.state.phone,
                          homeId: localStorage.getItem("homeId"),
                        },
                      })
                        .then((res) => {
                          console.log(res);
                          history.push("/mailcheck");
                          //localStorage.removeItem("homeId");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } else {
                      this.setState({
                        alertMessage: "Phone no must be 11 digits",
                        showAlert: true,
                      });
                    }
                  } else {
                    this.setState({
                      alertMessage: "Invalid phone no",
                      showAlert: true,
                    });
                  }
                } else {
                  this.setState({
                    alertMessage: "Passwor must be 8 charecters long",
                    showAlert: true,
                  });
                }
              } else {
                this.setState({
                  alertMessage: "Invalid password",
                  showAlert: true,
                });
              }
            } else {
              this.setState({
                alertMessage: "Invalid username format",
                showAlert: true,
              });
            }
          } else {
            this.setState({
              alertMessage: "Invalid username",
              showAlert: true,
            });
          }
        } else {
          this.setState({
            alertMessage: "Invalid email format",
            showAlert: true,
          });
        }
      } else {
        this.setState({
          alertMessage: "Invalid email",
          showAlert: true,
        });
      }
    } else {
      this.setState({
        alertMessage: "Invalid name",
        showAlert: true,
      });
    }
  };

  render() {
    return (
      <div className="backgroundsignup">
        <div className="pagesignup">
          <div className="formdivsignup">
            <Form className="formsignup">
              <FormGroup>
                <Label for="exampleName">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="exampleName"
                  placeholder="Enter name"
                  onChange={this.fields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter email"
                  onChange={this.fields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="exampleUsername"
                  placeholder="Enter username"
                  onChange={this.fields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter password"
                  onChange={this.fields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePhone">Phone no</Label>
                <Input
                  type="number"
                  name="phone"
                  id="examplePhone"
                  placeholder="Enter Phone no"
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
                    marginTop: "-8px",
                    marginBottom: "10px",
                  }}
                >
                  {this.state.alertMessage}
                </Alert>
              ) : null}
              <Button onClick={this.signup} className="btnsignup">
                Submit
              </Button>
              <Link to="/login" className="forgotloginn">
                Already a member ?
              </Link>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
