import axios from "axios";

const GET_CART = "GET_CART";

// const ADD_ACHAR = "ADD_ACHAR"

const gotCart = (cart) => ({
  type: GET_CART,
  cart,
});

// const addAchar = (achar) => ({
//   type: ADD_ACHAR,
//   achar
// })

export const fetchCart = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${id}/cart`);
    dispatch(gotCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = (acharId, orderId) => async (dispatch) => {
  try {
    await axios.put(`/api/achar_order`, { acharId, orderId });
    const cart = await axios.get(`/api/orders/${orderId}`);
    dispatch(gotCart(cart));
  } catch (error) {
    console.error(error);
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
