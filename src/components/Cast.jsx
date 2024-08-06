import React from "react";
import { Link } from "react-router-dom";

export default function Cast({ cast }) {
  return (
    <div className="mt-12">
      <h1 className="text-4xl font-semibold text-rose-400 mb-5">Cast :</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cast.map((actor, i) => (
          <Link
            to={`/person/${actor?.id}`}
            key={i}
            className="flex items-center"
          >
            <div className="w-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">
                {actor?.name || actor?.original_name}
              </h2>
              <p className="text-sm text-gray-400">{actor?.character}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
