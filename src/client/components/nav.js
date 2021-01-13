import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/user";

const Nav = ({ isLoggedIn, handleClick }) => {
  return (
    <div>
      {isLoggedIn ? (
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/achars">All Achars</Link>
          <a href="/" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/achars">All Achars</Link>
          <Link to="/signUp">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </div>
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
