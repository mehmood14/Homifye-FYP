import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // ButtonDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavbarHeader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  //const togglee = () => setOpen(!dropdownOpen);

  //const user = JSON.parse(localStorage.getItem("userInfo"));

  return localStorage.getItem("token") !== null &&
    localStorage.getItem("userInfo") !== null ? (
    <div>
      {/* <Navbar expand="md">
        <NavbarBrand href="/dashboard">Dashboard</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar style={{ justifyContent: "flex-end" }}>
          <ButtonDropdown isOpen={dropdownOpen} toggle={togglee}>
            <DropdownToggle caret>{user.username}</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Collapse>
      </Navbar> */}
    </div>
  ) : (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="justify-content-end" style={{ width: "100%" }} navbar>
            <NavItem>
              <Link to="/homelogin" className="nav-link">
                Login
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/homereg" className="nav-link">
                Signup
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarHeader;
