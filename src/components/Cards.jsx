import React from "react";
import { Link } from "react-router-dom";

export default function Cards({ data }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item, i) => (
        <Link
          to=""
          key={i}
          className="group block pb-3 border border-zinc-700 rounded-md overflow-hidden"
        >
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${
                item?.backdrop_path || item?.poster_path || item?.profile_path
              }`}
              className="w-full h-full object-cover"
            />
            <div className="mb-5 mr-4 absolute bottom-0 right-0 size-12 bg-violet-400 rounded-full grid place-items-center text-xl font-semibold">
              {item?.vote_average ? item?.vote_average.toFixed(1) : "N/A"}
            </div>
          </div>

          <div className="mt-2">
            <h1 className="group-hover:text-white px-2 text-2xl text-zinc-400 duration-300 ease-in-out">
              {item?.name ||
                item?.title ||
                item?.original_name ||
                item?.original_title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
