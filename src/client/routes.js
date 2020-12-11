import React from "react";
import { Switch, Route } from "react-router-dom";
import Achars from "./components/achars";
import Home from "./components/home";
import SingleAchar from "./components/singleAchar";
import addAchar from "./components/addAchar";
import { SignUp, Login } from "./components/authForm";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" compnent={SignUp} />
      <Route path="/signup" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/achars" component={Achars} />
      <Route path="/achars/:id" component={SingleAchar} />
      <Route path="/addAchar" component={addAchar} />
      <SignUp path="/signup" component={SignUp} />
    </Switch>
  );
};

export default Routes;
