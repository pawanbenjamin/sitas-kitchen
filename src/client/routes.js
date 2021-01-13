import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route } from "react-router-dom";
import Achars from "./components/achars";
import Home from "./components/home";
import SingleAchar from "./components/singleAchar";
import addAchar from "./components/addAchar";
import { SignUp, Login } from "./components/authForm";
import { me } from "./store/user";

const Routes = (props) => {
  const { getMe } = props;

  useEffect(() => {
    getMe();
  });

  return (
    <Switch>
      <Route path="/login" compnent={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/achars" component={Achars} />
      <Route path="/achars/:id" component={SingleAchar} />
      <Route path="/addAchar" component={addAchar} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => ({
  getMe: () => dispatch(me()),
});

export default withRouter(connect(mapState, mapDispatch)(Routes));
