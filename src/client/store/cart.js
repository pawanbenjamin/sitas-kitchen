import axios from "axios";

const GET_CART = "GET_CART";

const gotCart = (cart) => ({
  type: GET_CART,
  cart,
});

export const fetchCart = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${id}/cart`);
    dispatch(gotCart(data));
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
