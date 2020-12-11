import axios from "axios";
import history from "../history";

const CREATE_USER = "CREAT_USER";
const GET_USER = "GET_USER";

const createdUser = (user) => ({
  type: CREATE_USER,
  user,
});
const gotUser = (user) => ({
  type: GET_USER,
  user,
});

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
    history.pushState("/home");
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

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case CREATE_USER:
      return action.user;
    default:
      return state;
  }
}
