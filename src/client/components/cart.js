import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchCart,
  deleteCartItem,
  incrementCount,
  decrementCount,
} from "../store/cart";
import { fetchAchars } from "../store/achars";

import Paper from "@material-ui/core/Paper";
import { CardActionArea, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const Cart = (props) => {
  const { user, getCart, cart, removeItem, getAchars, addQty, subQty } = props;

  useEffect(() => {
    if (!user.id) {
      console.log("NO USER");
    } else {
      getCart(user.id);
      getAchars();
    }
  }, [user]);

  return (
    <div>
      <Typography
        style={{
          margin: "20px",
          textAlign: "center",
        }}
      >
        The Cart
      </Typography>
      {cart.total > 0 ? (
        cart.achars.map((achar, i) => (
          <Card
            style={{
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              marginRight: "10rem",
              marginLeft: "10rem",
              marginBottom: "5px",
            }}
          >
            <CardActionArea>
              <CardContent key={i}>
                <Typography>{achar.name}</Typography>
                <Typography>${achar.price / 100}</Typography>
                <Typography>Quantity: {achar.Achar_Order.qty}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  await removeItem(cart.id, achar.id);
                  await getCart(user.id);
                }}
              >
                Delete from Cart
              </Button>
              <Button
                disabled={achar.Achar_Order.qty < 2}
                onClick={async (e) => {
                  e.preventDefault();
                  await subQty(achar.id, cart.id);
                  await getCart(user.id);
                }}
              >
                -
              </Button>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  await addQty(achar.id, cart.id);
                  await getCart(user.id);
                }}
              >
                +
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography>Your cart is Empty!</Typography>
      )}
      <Typography
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Your order total is ${cart.total / 100}
      </Typography>
    </div>
  );
};

const mapState = (state) => ({
  user: state.user,
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
  removeItem: (orderId, acharId) => dispatch(deleteCartItem(orderId, acharId)),
  getAchars: () => dispatch(fetchAchars()),
  addQty: (acharId, orderId) => dispatch(incrementCount(acharId, orderId)),
  subQty: (acharId, orderId) => dispatch(decrementCount(acharId, orderId)),
});

export default connect(mapState, mapDispatch)(Cart);
