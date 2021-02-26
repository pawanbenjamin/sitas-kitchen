import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchCart,
  retrieveGuestCart,
  deleteCartItem,
  incrementCount,
  decrementCount,
  postGuestCart,
} from "../store/cart";
import { fetchAchars } from "../store/achars";

import { CardActionArea, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const Cart = (props) => {
  const {
    user,
    getCart,
    cart,
    removeItem,
    getAchars,
    addQty,
    subQty,
    getGuestCart,
    retrieveCart,
  } = props;

  const [guestCart, setGuestCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );

  useEffect(() => {
    if (!user.id) {
      console.log("NO USER");
      getGuestCart(guestCart);
      getAchars();
    } else {
      getCart(user.id);
      getAchars();
    }
  }, [user]);

  console.log("guest cart", guestCart);

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
      {cart.id ? (
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
                  if (user.id) {
                    await getCart(user.id);
                  } else {
                    await retrieveCart(cart.id);
                  }
                }}
              >
                Delete from Cart
              </Button>
              <Button
                disabled={achar.Achar_Order.qty < 2}
                onClick={async (e) => {
                  e.preventDefault();
                  await subQty(achar.id, cart.id);
                  if (user.id) {
                    await getCart(user.id);
                  } else {
                    await retrieveCart(cart.id);
                  }
                }}
              >
                -
              </Button>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  await addQty(achar.id, cart.id);
                  if (user.id) {
                    await getCart(user.id);
                  } else {
                    await retrieveCart(cart.id);
                  }
                }}
              >
                +
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography
          style={{
            margin: "20px",
            textAlign: "center",
          }}
        >
          Your cart is Empty!
        </Typography>
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
  getGuestCart: (cart) => dispatch(postGuestCart(cart)),
  retrieveCart: (cartId) => dispatch(retrieveGuestCart(cartId)),
});

export default connect(mapState, mapDispatch)(Cart);
