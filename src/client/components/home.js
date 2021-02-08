import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

const Home = (props) => {
  const { user, getCart } = props;
  // Get or Create DB cart if there is a user
  // if no user, initialize window.localStogage cart

  useEffect(() => {
    if (!user.id) {
      // window local storage
      console.log("No User");
      const cart = {};
      const stringCart = JSON.stringify(cart);
      window.localStorage.setItem("cart", stringCart);
    } else {
      getCart(user.id);
      console.log("The New User is:", user);
    }
  }, [user]);

  return (
    <div className="home">
      <Typography>Welcome to Sita's Kitchen!</Typography>
      <Typography>Browse our Home-Made Achars, and more!</Typography>
      <Link to="/achars">Achars</Link>
    </div>
  );
};

const mapS = (state) => ({
  user: state.user,
});

const mapD = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
});

export default connect(mapS, mapD)(Home);
