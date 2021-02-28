import { Typography } from "@material-ui/core";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import { fetchAchars } from "../store/achars";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Home = (props) => {
  const { user, getCart, getAchars } = props;
  // Get or Create DB cart if there is a user
  // if no user, initialize window.localStogage cart

  const classes = useStyles();

  useEffect(() => {
    if (!user.id) {
      // window local storage
      const cart = {};
      const stringCart = JSON.stringify(cart);
      window.localStorage.setItem("cart", stringCart);
      getAchars();
    } else {
      getCart(user.id);
      getAchars();
    }
  }, [user]);

  return (
    <div className={classes.page}>
      {user.id ? (
        <>
          <Typography>Welcome {user.firstName} to Sita's Kitchen!</Typography>
          <Typography>Browse our Home-Made Achars, and more!</Typography>
          <Typography component={Link} to="/achars">
            Achars
          </Typography>
        </>
      ) : (
        <>
          <Typography>Welcome to Sita's Kitchen!</Typography>
          <Typography>Browse our Home-Made Achars, and more!</Typography>
          <Link to="/achars">Achars</Link>
        </>
      )}
    </div>
  );
};

const mapS = (state) => ({
  user: state.user,
  achars: state.achars,
});

const mapD = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
  getAchars: () => dispatch(fetchAchars()),
});

export default connect(mapS, mapD)(Home);
