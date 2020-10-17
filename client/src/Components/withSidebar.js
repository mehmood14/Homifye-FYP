import React, { Component } from "react";
import { BrowserRouter as Route } from "react-router-dom";
import Drawer from "../Container/Drawer";
class WithSidebar extends Component {
  render() {
    console.log(this.props.path);
    const path = this.props.path;
    const replace = path.replace("/", "");
    localStorage.setItem("activeOption", replace);

    return (
      <>
        <Drawer />
        <Route {...this.props} />
      </>
    );
  }
}

export default WithSidebar;
