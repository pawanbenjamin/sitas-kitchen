import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCart, deleteCartItem } from "../store/cart";

const Cart = (props) => {
  const { user, getCart, cart, removeItem } = props;

  useEffect(() => {
    if (!user.id) {
      console.log("NO USER");
    } else {
      getCart(user.id);
    }
  }, [user]);

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   removeItem(cart.id);
  //   getCart(user.id);
  // };

  return (
    <div className="cart">
      <h3>The Cart</h3>
      {cart.achars !== undefined ? (
        cart.achars.map((achar) => (
          <div>
            <ul key={achar.id}>
              <li>{achar.name}</li>
              <li>${achar.price}</li>
            </ul>
            <button
              onClick={() => {
                removeItem(cart.id, achar.id);
                getCart(user.id);
              }}
            >
              Delete from Cart
            </button>
          </div>
        ))
      ) : (
        <h4>Your cart is Empty!</h4>
      )}
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
});

export default connect(mapState, mapDispatch)(Cart);
