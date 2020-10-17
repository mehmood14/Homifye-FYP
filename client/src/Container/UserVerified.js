import React, { Component } from "react";
import "./UserVerified.css";
import { Button, Form } from "reactstrap";
import axios from "axios";
import url from "url";

class UserVerified extends Component {
  componentDidMount() {
    const urlobj = url.parse(document.location.href, true);
    console.log(urlobj);
    axios({
      method: "get",
      url:
        "http://127.0.0.1:3000/verifyUser/" +
        urlobj.query.id +
        "/" +
        urlobj.query.code,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err::", err);
        window.location.href = "/notfound";
      });
  }

  homelogin = () => {
    window.location.href = "/login";
  };

  render() {
    return (
      <div className="backgroundloginhome">
        <div className="pageloginhome">
          <div className="loginformdiv">
            <Form className="homeloginform">
              <h2>Your are Verified NOW</h2>
              <div className="btndont">
                <Button onClick={this.homelogin} className="btnhomelogin">
                  Click here to LOGIN !
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default UserVerified;
