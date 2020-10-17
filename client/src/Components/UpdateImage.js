import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";
import { Input } from "reactstrap";

export default class LeftUpdateImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };

    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.image);
    this.setState({ image: user.image });
  }

  handleChangeImage = (e) => {
    const token = localStorage.getItem("token");

    this.setState({ image: URL.createObjectURL(e.target.files[0]) });

    var bodyFormData = new FormData();
    bodyFormData.append("image", e.target.files[0]);
    //console.log(e.target.files[0]);

    axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
      url: "http://127.0.0.1:3000/users/newProfileImage",
      data: bodyFormData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err::", err);
      });
  };

  render() {
    return (
      <div>
        <img className="imgg" src={this.state.image} alt="abc" />
        <Input
          style={{ marginTop: "70%" }}
          type="file"
          value={this.state.image}
          onChange={this.handleChangeImage}
        />
      </div>
    );
  }
}
