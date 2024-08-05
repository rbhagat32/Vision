import axios from "../../utils/axios";
import { getTvShow } from "../reducers/TvReducer";
export { removeTvShow } from "../reducers/TvReducer";

export const asyncGetTvShow = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const reviews = await axios.get(`/tv/${id}/reviews`);

    const tvShowData = {
      details: details.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((video) => video.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      reviews: reviews.data.results,
    };

    dispatch(getTvShow(tvShowData));
  } catch (error) {
    console.log(error);
  }
};
