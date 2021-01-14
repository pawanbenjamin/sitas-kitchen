import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }

  render() {
    return (
      <div>
        <h3>The Cart</h3>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  getCart: (id) => dispatch(fetchCart(id)),
});

export default connect(mapState, mapDispatch)(Cart);
