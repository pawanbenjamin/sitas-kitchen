import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Typography>Welcome to Sita's Kitchen!</Typography>
      <Typography>Browse our Home-Made Achars, and more!</Typography>
      <Link to="/achars">Achars</Link>
    </div>
  );
};

export default Home;
