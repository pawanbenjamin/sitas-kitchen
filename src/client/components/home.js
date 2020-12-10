import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h3>This is My Home Page</h3>
      <Link to="/achars">Achars</Link>
    </div>
  );
};

export default Home;
