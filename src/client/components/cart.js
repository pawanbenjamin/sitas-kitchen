import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component() {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return <h3>This the cart</h3>;
  }
}

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(Cart);
