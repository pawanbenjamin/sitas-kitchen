import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

const Cart = (props) => {
  const { user, getCart, cart } = props;

  useEffect(() => {
    getCart(user.id);
  }, [user]);

  let achars = cart.achars;

  return (
    <div className="cart">
      <h3>The Cart</h3>
      {achars !== undefined ? (
        achars.map((achar) => (
          <ul>
            <li>{achar.name}</li>
            <li>${achar.price}</li>
          </ul>
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
});

export default connect(mapState, mapDispatch)(Cart);
