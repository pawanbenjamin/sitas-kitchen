import React from "react";
import { Switch, Route } from "react-router-dom";
import Achars from "./components/achars";
import Home from "./components/home";
import SingleAchar from "./components/singleAchar";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/achars" component={Achars} />
      <Route path="/achars/:id" component={SingleAchar} />
    </Switch>
  );
};

export default Routes;
