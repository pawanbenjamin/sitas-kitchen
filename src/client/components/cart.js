import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchCart,
  deleteCartItem,
  incrementCount,
  decrementCount,
} from "../store/cart";
import { fetchAchars } from "../store/achars";

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
    <div className="cart">
      <h3>The Cart</h3>
      {cart.total > 0 ? (
        cart.achars.map((achar, i) => (
          <>
            <div key={i}>
              <ul key={achar.id}>
                <li>{achar.name}</li>
                <li>${achar.price / 100}</li>
                <li>Quantity: {achar.Achar_Order.qty}</li>
              </ul>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await removeItem(cart.id, achar.id);
                  await getCart(user.id);
                }}
              >
                Delete from Cart
              </button>
              <button
                disabled={achar.Achar_Order.qty < 2}
                onClick={async (e) => {
                  e.preventDefault();
                  await subQty(achar.id, cart.id);
                  await getCart(user.id);
                }}
              >
                -
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await addQty(achar.id, cart.id);
                  await getCart(user.id);
                }}
              >
                +
              </button>
            </div>
          </>
        ))
      ) : (
        <h4>Your cart is Empty!</h4>
      )}
      <h3>Your order total is ${cart.total / 100}</h3>
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
