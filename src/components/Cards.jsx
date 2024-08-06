import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Cards({ data, mediaType, backToTop = true }) {
  const [isHovered, setIsHovered] = useState({ bool: false, index: 0 });

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item, i) => (
        <Link
          to={`/${item?.media_type || mediaType}/${item?.id}`}
          key={i}
          onMouseEnter={() => setIsHovered({ bool: true, index: i })}
          onMouseLeave={() => setIsHovered({ bool: false, index: null })}
          className="relative block pb-3 border border-zinc-700 hover:border-zinc-500 rounded-md duration-300 ease-in-out overflow-hidden"
        >
          {item?.poster_path && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered.bool && isHovered.index === i ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="glass absolute w-full h-full top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-10 pointer-events-none"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
                className="object-contain w-full h-full"
              />
            </motion.div>
          )}

          <div className="relative" style={{ minHeight: "220px" }}>
            <img
              src={
                item?.backdrop_path || item?.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${
                      item?.backdrop_path || item?.profile_path
                    }`
                  : "/no-image.png"
              }
              className="w-full h-full object-cover"
            />
            {item?.vote_average ? (
              <div className="mb-5 mr-4 absolute bottom-0 right-0 size-12 bg-rose-400 rounded-full grid place-items-center text-xl font-semibold">
                {item?.vote_average.toFixed(1)}
              </div>
            ) : null}
          </div>

          <div className="mt-2 px-2 flex flex-col gap-2">
            <h1 className="text-3xl">
              {item?.name ||
                item?.title ||
                item?.original_name ||
                item?.original_title}
            </h1>

            {item?.overview && (
              <p className="max-w-[80ch] text-zinc-400 text-sm md:text-md">
                {item?.overview.length > 200
                  ? item?.overview.slice(0, 200) + "..."
                  : item?.overview}
              </p>
            )}
          </div>
        </Link>
      ))}

      {/* Back to top */}
      {backToTop && (
        <div
          onClick={() => window.scrollTo(0, 0)}
          className="glass fixed z-[100] bottom-[6%] right-[4%] md:right-[3%] p-2 cursor-pointer rounded-full text-5xl"
        >
          <FaRegArrowAltCircleUp />
        </div>
      )}
    </div>
  );
}
