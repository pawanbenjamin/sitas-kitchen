import axios from "axios";

const GET_CART = "GET_CART";

const ADD_ACHAR = "ADD_ACHAR";

const gotCart = (cart) => ({
  type: GET_CART,
  cart,
});

const addAchar = (achar) => ({
  type: ADD_ACHAR,
  achar,
});

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
    console.log("In THunk");

    const achar = await axios.put(
      `/api/orders/${orderId}/addProduct/${acharId}`
    );

    dispatch(addAchar(achar.data));
  } catch (error) {
    console.error(error);
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_ACHAR:
      return {
        ...state,
        achars: [...state.achars, action.achar],
      };
    default:
      return state;
  }
}
