import React from "react";
import { Switch, Route } from "react-router-dom";
import Achars from "./achars";
import Home from "./home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/achars" component={Achars} />
    </Switch>
  );
};

export default Routes;
