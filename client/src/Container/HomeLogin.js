import React, { Component } from "react";
import "./HomeLogin.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

export default class HomeLogin extends Component {
  state = {
    name: "",
    showAlert: false,
    alertMessage: "",
  };

  fields = (e) => {
    this.setState({ name: e.target.value });
  };

  homelogin = () => {
    const { history } = this.props;

    if (
      this.state.name !== null &&
      this.state.name !== undefined &&
      this.state.name !== ""
    ) {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/homeLogin",
        data: {
          name: this.state.name,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            history.push("/login");
            localStorage.setItem("homeId", res.data._id);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            alertMessage: "Home not found",
            showAlert: true,
          });
        });
    } else {
      this.setState({
        alertMessage: "Please enter a valid name.",
        showAlert: true,
      });
    }
  };

  render() {
    return (
      <div className="backgroundloginhome">
        <div className="pageloginhome">
          <div className="loginformdiv">
            <Form className="homeloginform">
              <FormGroup>
                <Label for="exampleName">Find my home</Label>
                <Input
                  type="text"
                  name="name"
                  id="exampleName"
                  placeholder="Enter home name"
                  onChange={this.fields}
                  invalid={this.state.invalidName}
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
              <Button onClick={this.homelogin} className="btnhomelogin">
                Find
              </Button>

              <Link to="/homereg" className="forgotloginn">
                Dont have a home ?
              </Link>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
