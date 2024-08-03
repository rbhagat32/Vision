import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import Loading from "../utils/Loading";
import AutoplaySwiper from "../components/AutoplaySwiper";
import FreemodeSwiper from "../components/FreemodeSwiper";
import { capitalize } from "../utils/capitalize";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  document.title = "Vision";

  const getFeatured = () => {
    setLoading(true);
    axios
      .get("/trending/all/day")
      .then((res) => {
        const results = res.data.results;
        const randomItems = [];
        const usedIndices = new Set();

        while (randomItems.length < results.length && randomItems.length < 5) {
          const randomIndex = Math.floor(Math.random() * results.length);
          if (!usedIndices.has(randomIndex)) {
            randomItems.push(results[randomIndex]);
            usedIndices.add(randomIndex);
          }
        }

        setFeatured(randomItems);
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
      <Featured items={featured} />
      <Trending category="movies" items={movies} />
      <Trending category="tv-shows" items={tvShows} />
    </div>
  );
}

const Featured = ({ items }) => {
  return <AutoplaySwiper data={items} />;
};

const Trending = ({ category, items }) => {
  return (
    <div className="px-4 md:px-12 mt-16 w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="mb-2 font-medium text-3xl lg:text-4xl">
          Trending {category === "tv-shows" ? "TV Shows" : capitalize(category)}
        </h1>

        <Link
          to={`/${category}`}
          className="block text-zinc-400 hover:text-rose-400 duration-300 ease-in-out"
        >
          Explore More
        </Link>
      </div>

      <FreemodeSwiper items={items} />
    </div>
  );
};
