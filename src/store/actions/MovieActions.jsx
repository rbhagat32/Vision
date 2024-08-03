import axios from "../../utils/axios";
import { getMovie, removeMovie } from "../reducers/MovieReducer";
export { removeMovie } from "../reducers/MovieReducer";

export const asyncGetMovie = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);

    const movieData = {
      details: details.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((video) => video.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };

    dispatch(getMovie(movieData));
  } catch (error) {
    console.log(error);
  }
};
