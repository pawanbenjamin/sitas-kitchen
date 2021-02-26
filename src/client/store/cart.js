import axios from "axios";

const GET_CART = "GET_CART";

const ADD_ACHAR = "ADD_ACHAR";

const REMOVE_ACHAR = "REMOVE_ACHAR";

const INCREMENT = "INCREMENT";

const DECRIMENT = "DECRIMENT";

const gotCart = (cart) => ({
  type: GET_CART,
  cart,
});

const addAchar = (acharId) => ({
  type: ADD_ACHAR,
  acharId,
});

const removeAchar = (achar) => ({
  type: REMOVE_ACHAR,
  achar,
});

const incrementAchar = (cart) => ({
  type: INCREMENT,
  cart,
});

const decrementAchar = (cart) => ({
  type: DECRIMENT,
  cart,
});

export const incrementCount = (acharId, orderId) => async (dispatch) => {
  try {
    await axios.put("/api/achar_order/add", { acharId, orderId });
    const { data } = await axios.get(`/api/orders/${orderId}`);
    dispatch(incrementAchar(data));
  } catch (error) {
    console.error(error);
  }
};

export const decrementCount = (acharId, orderId) => async (dispatch) => {
  try {
    await axios.put("/api/achar_order/subtract", { acharId, orderId });
    const { data } = await axios.get(`/api/orders/${orderId}`);
    dispatch(decrementAchar(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItem = (orderId, acharId) => async (dispatch) => {
  try {
    const cart = await axios.delete(
      `/api/orders/${orderId}/removeProduct/${acharId}`
    );
    const { data } = await axios.get(`/api/achars/${acharId}`);
    dispatch(removeAchar(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchCart = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${id}/cart`);
    dispatch(gotCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const retrieveGuestCart = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`);
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

export const postGuestCart = (cart) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/orders/guest", cart);
    dispatch(gotCart(data));
  } catch (error) {
    console.error(error);
  }
};
export default function (state = {}, action) {
  switch (action.type) {
    // case DECRIMENT:
    //     return action.cart
    // case INCREMENT:
    //   return action.cart;
    case GET_CART:
      return action.cart;
    case ADD_ACHAR:
      return {
        ...state,
        achars: [...state.achars, action.achar],
      };
    case REMOVE_ACHAR:
      const newAchars = state.achars.filter(
        (achar) => achar.id !== action.acharId
      );
      return {
        ...state,
        achars: newAchars,
      };
    default:
      return state;
  }
}
