import axios from "axios";

const GET_ACHAR = "GET_ACHAR";
const DELETE_ACHAR = "DELETE_ACHAR";
const UPDATE_ACHAR = "UPDATE_ACHAR";

const gotAchar = (singleAchar) => ({
  type: GET_ACHAR,
  singleAchar,
});

const deleteAchar = (achar) => ({
  type: DELETE_ACHAR,
  achar,
});

const updateAchar = (achar) => ({
  type: UPDATE_ACHAR,
  achar,
});

export const fetchAchar = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/achars/${id}`);
    if (data === null) {
      dispatch(gotAchar({}));
    } else {
      console.log(data);
      dispatch(gotAchar(data));
    }
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

export const updateTheAchar = (achar) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/achars/${achar.id}`, achar);
    dispatch(updateAchar(data));
  } catch (error) {
    console.error(error);
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ACHAR:
      return action.singleAchar;
    case DELETE_ACHAR:
      return action.achar;
    case UPDATE_ACHAR:
      return action.achar;
    default:
      return state;
  }
}
