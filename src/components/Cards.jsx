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
              src={`https://image.tmdb.org/t/p/w500/${
                item?.backdrop_path || item?.poster_path || item?.profile_path
              }`}
              className="w-full h-full object-cover"
            />
            <div className="mb-5 mr-4 absolute bottom-0 right-0 size-12 bg-rose-500 rounded-full grid place-items-center text-xl font-semibold">
              {item?.vote_average ? item?.vote_average.toFixed(1) : "N/A"}
            </div>
          </div>

          <div className="mt-2 px-2 flex flex-col gap-2">
            <h1 className="text-3xl">
              {item?.name ||
                item?.title ||
                item?.original_name ||
                item?.original_title}
            </h1>

            <p className="max-w-[80ch] text-zinc-400 text-sm md:text-md">
              {item?.overview.length > 140
                ? item?.overview.slice(0, 140) + "..."
                : item?.overview}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
