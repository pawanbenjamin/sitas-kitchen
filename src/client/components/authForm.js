import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store/user";
import { fetchCart } from "../store/cart";
import Button from "@material-ui/core/Button";

// follow auth-form component

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, user, getCart } = props;

  console.log(user);

  useEffect(() => {
    if (user.id) {
      getCart(user.id);
    }
  }, [user]);

  return (
    <div>
      {user.id ? (
        <h3>Welcome {user.username}</h3>
      ) : (
        <form onSubmit={handleSubmit} name={name}>
          <input name="username" type="text" placeholder="User-Name" />
          <input name="firstName" type="text" placeholder="First Name" />
          <input name="lastName" type="text" placeholder="Last Name" />
          <input name="email" type="text" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <Button variant="contained" type="submit">
            {displayName}
          </Button>
          {error && error.response && <div>{error.response.data}</div>}
        </form>
      )}
    </div>
  );
};

const mapLogin = (state) => ({
  user: state.user,
  name: "login",
  displayName: "Login",
  error: state.user.error,
});

const mapSignup = (state) => ({
  user: state.user,
  name: "signup",
  displayName: "Sign Up",
  error: state.user.error,
});

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(e) {
      e.preventDefault();
      if (e.target.username === undefined) {
        const formName = e.target.name;
        const email = e.target.email.value;
        const password = e.target.password.value;
        dispatch(auth("", "", "", email, password, formName));
        // await dispatch(fetchCart(user.id));
      } else {
        const formName = e.target.name;
        const username = e.target.username.value;
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        dispatch(
          auth(username, firstName, lastName, email, password, formName)
        );
        // await dispatch(fetchCart(user.id));
      }
    },
    getCart(id) {
      dispatch(fetchCart(id));
    },
  };
};

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));
export const SignUp = withRouter(connect(mapSignup, mapDispatch)(AuthForm));

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
