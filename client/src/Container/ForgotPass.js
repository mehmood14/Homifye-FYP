import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./ForgotPass.css";
import Alert from "@material-ui/lab/Alert";

export default class ForgotPass extends Component {
  state = {
    email: "",
    showAlert: false,
    alertMessage: "",
  };

  fields = (e) => {
    this.setState({ email: e.target.value });
  };

  ValidateEmail = () => {
    const e = /\S+@\S+\.\S+/;
    return e.test(this.state.email);
  };

  forgot = () => {
    if (
      this.state.email !== null &&
      this.state.email !== undefined &&
      this.state.email !== ""
    ) {
      if (this.ValidateEmail(this.state.email)) {
        const { history } = this.props;

        axios({
          method: "post",
          url: "http://127.0.0.1:3000/forgotPass",
          data: {
            email: this.state.email,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              history.push("/forgotmail");
            }
          })
          .catch((err) => {
            console.log("err::", err);
            this.setState({
              alertMessage: "Incorrect email",
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
  };

  render() {
    return (
      <div className="backgroundforgot">
        <div className="pageforgot">
          <div className="formdivforgot">
            <Form className="formforgot">
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmai;"
                  placeholder="Enter your email"
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
