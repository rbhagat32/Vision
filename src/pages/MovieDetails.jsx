import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetMovie, removeMovie } from "../store/actions/MovieActions";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, []);

  return <div>MovieDetails</div>;
}
