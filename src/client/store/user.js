import axios from "axios";
import history from "../history";

const CREATE_USER = "CREAT_USER";
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

const createdUser = (user) => ({
  type: CREATE_USER,
  user,
});
const gotUser = (user) => ({
  type: GET_USER,
  user,
});
const removedUser = () => ({
  type: REMOVE_USER,
});

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(gotUser(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const auth = (
  username,
  firstName,
  lastName,
  email,
  password,
  method
) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {
      username,
      firstName,
      lastName,
      email,
      password,
    });
  } catch (authError) {
    return dispatch(gotUser({ error: authError }));
  }
  try {
    dispatch(gotUser(res.data));
  } catch (dispatchOrHistError) {
    console.error(dispatchOrHistError);
  }
};

export const createUser = (userParams) => async (dispatch) => {
  try {
    const newUser = await axios.post("/api/users", userParams);
    dispatch(createdUser(newUser.data));
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
    dispatch(removedUser());
  } catch (error) {
    console.error(err);
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case CREATE_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
