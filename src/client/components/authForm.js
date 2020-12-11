import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store/user";

// follow auth-form component

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <input name="username" type="text" placeholder="User-Name" />
        <input name="firstName" type="text" placeholder="First Name" />
        <input name="lastName" type="text" placeholder="Last Name" />
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">{displayName}</button>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
    </div>
  );
};

const mapLogin = (state) => ({
  name: "login",
  displayName: "Login",
  error: state.user.error,
});

const mapSignup = (state) => ({
  name: "signup",
  displayName: "Sign Up",
  error: state.user.error,
});

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(e) {
      e.preventDefault();
      const formName = e.target.name;
      const username = e.target.username.value;
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      dispatch(auth(username, firstName, lastName, email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const SignUp = connect(mapSignup, mapDispatch)(AuthForm);

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
