import React from "react";
import { Switch, Route } from "react-router-dom";
import Achars from "./components/achars";
import Home from "./components/home";
import SingleAchar from "./components/singleAchar"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/achars" component={Achars} />
      <Route exact path="/achars/:id" component={SingleAchar} />
    </Switch>
  );
};

export default Routes;
