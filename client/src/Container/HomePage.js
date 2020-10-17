import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";
import "./HomePage.css";
import NavbarHeader from "../Components/Navbar";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    return (
      <div className="background">
        <NavbarHeader />
        <div className="page">
          <Card>
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <Link to="/homereg" className="nav-link">
                <Button className="getButton">Get Started</Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
