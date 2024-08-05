import axios from "../../utils/axios";
import { getPerson } from "../reducers/PersonReducer";
export { removePerson } from "../reducers/PersonReducer";

export const asyncGetPerson = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const credits = await axios.get(`/person/${id}/combined_credits`);

    const personData = {
      details: details.data,
      credits: credits.data.cast,
    };

    dispatch(getPerson(personData));
  } catch (error) {
    console.log(error);
  }
};
