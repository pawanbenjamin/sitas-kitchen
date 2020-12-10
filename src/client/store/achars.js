import axios from "axios";

// Actions
const GET_ACHARS = "GET_ACHARS";

// Action Creators
const gotAchars = (achars) => ({
  type: GET_ACHARS,
  achars,
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

export default function (state = [], action) {
  switch (action.type) {
    case GET_ACHARS:
      return action.achars;
    default:
      return state;
  }
}
