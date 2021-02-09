import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCart, deleteCartItem } from "../store/cart";
import { fetchAchars } from "../store/achars";

const Cart = (props) => {
  const { user, getCart, cart, removeItem, getAchars } = props;

  useEffect(() => {
    if (!user.id) {
      console.log("NO USER");
    } else {
      getCart(user.id);
      getAchars();
    }
  }, [user]);

  console.log(typeof cart.achars);
  return (
    <div className="cart">
      <h3>The Cart</h3>
      {typeof cart.achars === "object" ? (
        cart.achars.map((achar, i) => (
          <div key={i}>
            <ul key={achar.id}>
              <li>{achar.name}</li>
              <li>${achar.price}</li>
            </ul>
            <button
              onClick={async () => {
                await removeItem(cart.id, achar.id);
                await getCart(user.id);
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
  getAchars: () => dispatch(fetchAchars()),
});

export default connect(mapState, mapDispatch)(Cart);
