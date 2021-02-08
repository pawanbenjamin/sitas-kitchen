import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Typography>Hi!</Typography>
      <Link to="/achars">Achars</Link>
    </div>
  );
};

export default Home;
