import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Loading from "../utils/Loading";
import Button from "../components/Button";
import Swiper from "../components/SwiperJs";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);

  const getFeatured = () => {
    setLoading(true);
    axios
      .get("/trending/all/day")
      .then((res) => {
        const randomIndex = Math.floor(Math.random() * res.data.results.length);
        setFeatured(res.data.results[randomIndex]);
        setTrending(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFeatured();
  }, []);

  return loading ? (
    <Loading height="h-[70vh]" size="size-14" />
  ) : (
    <div className="h-screen">
      <Featured item={featured} />
      <Trending items={trending} />
    </div>
  );
}

const Featured = ({ item }) => {
  return (
    <div
      className="h-[70vh]"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${
          item.backdrop_path || item.poster_path || item.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-4 md:px-12 py-10 w-full h-full flex flex-col gap-4 justify-end">
        <h1 className="w-full md:max-w-[18ch] font-black text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none">
          {item.name || item.title || item.original_name || item.original_title}
        </h1>
        <p className="max-w-[80ch] text-zinc-400 text-sm md:text-lg">
          {item.overview.length > 200
            ? item.overview.slice(0, 200) + "..."
            : item.overview}
        </p>
        <Button text="Watch Trailer" />
      </div>
    </div>
  );
};

const Trending = ({ items }) => {
  return (
    <div className="px-4 md:px-12 py-10 w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-zinc-400 text-4xl">Trending</h1>
      </div>
      <Swiper items={items} />
    </div>
  );
};
