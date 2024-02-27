import React, { useContext } from "react";
import "../Styles/NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../Auth/UserContext";

function NavBar({ logout }) {
  const { currUser } = useContext(UserContext);
  console.log(currUser)
  const loggedInNav =
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink to="/companies">Companies</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/jobs">Jobs</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/profile">Profile</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/login" onClick={logout}>Logout {currUser ? currUser.firstName : ""}</NavLink>
      </NavItem>
    </Nav>

  const loggedOutNav =
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink to="/signup">Sign up</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/login">Log in</NavLink>
      </NavItem>
    </Nav>


  return (
    <Navbar expand="md">
      <NavLink to="/" className="navbar-brand">
        Jobly Board
      </NavLink>
      {currUser ? loggedInNav : loggedOutNav}
    </Navbar>
  );
}

export default NavBar;
