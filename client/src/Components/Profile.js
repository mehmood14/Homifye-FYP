import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import "./Profile.css";
import axios from "axios";
import UpdatePassword from "./UpdatePassword";
import UpdateImage from "./UpdateImage";

export default class Profile extends Component {
  state = {
    name: "",
    email: "",
    username: "",
    phone: "",
    img: "",
    invalidName: false,
    invalidPhone: false,
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({
      email: user.email,
      name: user.name,
      username: user.username,
    });
    this.setState({ password: user.password });
    this.setState({ phone: user.phone });
    this.setState({ invalidName: false });
    this.setState({ invalidPassword: false });
    this.setState({ invalidPhone: false });
  }

  fields = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  savebtn = () => {
    console.log("state", this.state);
    const token = localStorage.getItem("token");
    console.log("tok", token);

    if (
      this.state.name !== null &&
      this.state.name !== undefined &&
      this.state.name !== ""
    ) {
    } else {
      console.log("name required");
      this.setState({ invalidName: true });
    }

    if (
      this.state.phone !== null &&
      this.state.phone !== undefined &&
      this.state.phone !== ""
    ) {
    } else {
      console.log("Phone No required");
      this.setState({ invalidPhone: true });
    }

    if (this.state.phone.length === 8) {
    } else {
      alert("phone length mst be 11");
    }

    if (!this.state.invalidName && !this.state.invalidPhone) {
      axios({
        method: "post",
        headers: {
          token: token,
        },
        url: "http://127.0.0.1:3000/users/updateProfile",
        data: {
          name: this.state.name,
          phone: this.state.phone,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("err::", err);
        });
    } else {
      console.log("np");
    }
  };

  render() {
    return (
      <div className="profile-wrapper">
        profile
        <Form>
          <div className="profile">
            <UpdateImage />

            <div style={{ width: "20%" }}>
              <FormGroup>
                <Label for="exampleName">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="exampleName"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={this.fields}
                  invalid={this.state.invalidName}
                />
                {
                  <FormFeedback invalid={this.state.invalidName}>
                    Name is missing
                  </FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  disabled
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter email"
                  value={this.state.email}

                  // onChange={this.fields}
                  // invalid={this.state.invalidEmail}
                />
                {/* <FormFeedback invalid={this.state.invalidEmail}>
                  Email is missing
                </FormFeedback> */}
              </FormGroup>
              <FormGroup>
                <Label for="exampleUsername">Username</Label>
                <Input
                  disabled
                  type="text"
                  name="username"
                  id="exampleUsername"
                  placeholder="Enter username"
                  value={this.state.username}

                  // onChange={this.fields}
                  // invalid={this.state.invalidUsername}
                />
                {/* <FormFeedback invalid={this.state.invalidUsername}>
                  Username is missing
                </FormFeedback> */}
              </FormGroup>

              <FormGroup>
                <Label for="examplePhone">Phone no</Label>
                <Input
                  type="number"
                  name="phone"
                  id="examplePhone"
                  placeholder="Enter Phone no"
                  value={this.state.phone}
                  onChange={this.fields}
                  invalid={this.state.invalidPhone}
                />
                {
                  <FormFeedback invalid={this.state.invalidPhone}>
                    Phone no is missing
                  </FormFeedback>
                }
              </FormGroup>

              <Button onClick={this.savebtn}>Save</Button>
            </div>
            <UpdatePassword />
          </div>
        </Form>
      </div>
    );
  }
}
