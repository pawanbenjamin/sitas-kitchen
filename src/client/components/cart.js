import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }

  render() {
    let achars = this.props.cart.achars;
    return (
      <div>
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
  }
}

const mapState = (state) => ({
  user: state.user,
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
});

export default connect(mapState, mapDispatch)(Cart);
