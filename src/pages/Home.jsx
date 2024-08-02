import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import Loading from "../utils/Loading";
import Button from "../components/Button";
import SwiperJs from "../components/SwiperJs";
import { capitalize } from "../utils/capitalize";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  const getFeatured = () => {
    setLoading(true);
    axios
      .get("/trending/all/day")
      .then((res) => {
        const randomIndex = Math.floor(Math.random() * res.data.results.length);
        setFeatured(res.data.results[randomIndex]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrendingMovies = () => {
    setLoading(true);
    axios
      .get("/trending/movie/day")
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrendingTvShows = () => {
    setLoading(true);
    axios
      .get("/trending/tv/day")
      .then((res) => {
        setTvShows(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFeatured();
    getTrendingMovies();
    getTrendingTvShows();
  }, []);

  return loading ? (
    <Loading height="h-screen" size="size-14" />
  ) : (
    <div className="pb-10">
      <Featured item={featured} />
      <Trending category="movies" items={movies} />
      <Trending category="tv-shows" items={tvShows} />
    </div>
  );
}

const Featured = ({ item }) => {
  return (
    <div
      className="h-[70vh]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${
          item?.backdrop_path || item?.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-4 md:px-12 py-10 w-full h-full flex flex-col gap-4 justify-end">
        <h1 className="w-full md:max-w-[18ch] font-black text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none">
          {item?.name ||
            item?.title ||
            item?.original_name ||
            item?.original_title}
        </h1>
        <p className="max-w-[80ch] text-zinc-400 text-sm md:text-lg">
          {item?.overview.length > 180
            ? item?.overview.slice(0, 180) + "..."
            : item?.overview}
        </p>
        <Button text="Watch Trailer" />
      </div>
    </div>
  );
};

const Trending = ({ category, items }) => {
  return (
    <div className="px-4 md:px-12 mt-16 w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="mb-2 font-medium text-3xl lg:text-4xl">
          Trending {`${capitalize(category)}`}
        </h1>

        <Link
          to="/trending"
          className="block text-zinc-400 hover:text-violet-400 duration-300 ease-in-out"
        >
          Explore More
        </Link>
      </div>

      <SwiperJs items={items} />
    </div>
  );
};
