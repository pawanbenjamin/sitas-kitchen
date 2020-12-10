import axios from "axios";

// Actions
const GET_ACHARS = "GET_ACHARS";
const ADD_ACHAR = "ADD_ACHAR";
const DELETE_ACHAR = "DELETE_ACHAR";

// Action Creators
const gotAchars = (achars) => ({
  type: GET_ACHARS,
  achars,
});

const addAchar = (achar) => ({
  type: ADD_ACHAR,
  achar,
});

const deleteAchar = (achar) => ({
  type: DELETE_ACHAR,
  achar,
});

// Thunk
export const fetchAchars = () => async (dispatch) => {
  try {
    const achars = await axios.get("/api/achars");
    dispatch(gotAchars(achars.data));
  } catch (error) {
    console.error(error);
  }
};

export const addAnAchar = (achar) => async (dispatch) => {
  try {
    const newAchar = await axios.post("/api/achars", achar);
    dispatch(addAchar(newAchar.data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteTheAchar = (id) => async (dispatch) => {
  try {
    const deletedAchar = await axios.delete(`/api/achars/${id}`);
    dispatch(deleteAchar(deletedAchar));
  } catch (error) {
    console.error(error);
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_ACHARS:
      return action.achars;
    case ADD_ACHAR:
      return [...state, action.achar];
    case DELETE_ACHAR:
      return [state.filter((a) => a.id !== action.achar.id)];
    default:
      return state;
  }
}
