import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./HomeReg.css";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

export default class HomeReg extends Component {
  state = {
    name: "",
    address: "",
    email: "",
    showAlert: false,
    alertMessage: "",
  };

  fields = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validateEmail = () => {
    // eslint-disable-next-line
    const em = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(this.state.email);
  };

  homeReg = () => {
    if (
      this.state.name !== null &&
      this.state.name !== undefined &&
      this.state.name !== ""
    ) {
      if (
        this.state.address !== null &&
        this.state.address !== undefined &&
        this.state.address !== ""
      ) {
        if (
          this.state.email !== null &&
          this.state.email !== undefined &&
          this.state.email !== ""
        ) {
          if (this.validateEmail(this.state.email)) {
            const { history } = this.props;

            axios({
              method: "post",
              url: "http://127.0.0.1:3000/registerHome",
              data: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
              },
            })
              .then((res) => {
                console.log("res", res);
                if (res.status === 200) {
                  history.push("/signup");
                }
              })
              .catch((err) => {
                console.log("err::", err);
                this.setState({
                  alertMessage: "Already registered",
                  showAlert: true,
                });
              });
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
          alertMessage: "Invalid address",
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
      <div className="backgroundreghome">
        <div className="pagereghome">
          <div className="regformdiv">
            <Form className="homeregform">
              <FormGroup>
                <Label for="exampleName">Home Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="exampleName"
                  placeholder="Enter home name"
                  onChange={this.fields}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleAddress">Home Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="exampleAddress"
                  placeholder="Enter Address"
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
              <Button onClick={this.homeReg} className="btnhomereg">
                Submit
              </Button>
              <Link to="/homelogin" className="forgotloginn">
                Already have one ?
              </Link>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
