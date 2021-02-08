import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/user";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const Nav = ({ isLoggedIn, handleClick }) => {
  return (
    <>
      {isLoggedIn ? (
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/achars">All Achars</Link>
          <a href="/" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart">Cart</Link>
        </div>
      ) : (
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/achars">All Achars</Link>
          <Link to="/signUp">Sign Up</Link>
          <Link to="/login">Log In</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Nav);
