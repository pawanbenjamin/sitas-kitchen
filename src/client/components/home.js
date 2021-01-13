import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h3>Welcome to Sita's Kitchen</h3>
      <Link to="/achars">Achars</Link>
    </div>
  );
};

export default Home;
