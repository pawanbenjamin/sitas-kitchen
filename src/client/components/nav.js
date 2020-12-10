import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/achars">All Achars</Link>
    </div>
  );
};

export default Nav;
