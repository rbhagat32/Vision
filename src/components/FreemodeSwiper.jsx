import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FreemodeSwiper({ items, mediaType }) {
  const [isHovered, setIsHovered] = useState({ bool: false, index: 0 });

  // set window width on resize
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // returns the number of slides per view based on window width
  const getSlidesPerView = () => {
    if (windowWidth > 1280) {
      return 4;
    } else if (windowWidth > 1024) {
      return 3;
    } else if (windowWidth >= 640) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <div>
      <Swiper
        slidesPerView={getSlidesPerView()}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <Link
              to={`/${item?.media_type || mediaType}/${item?.id}`}
              onMouseEnter={() => setIsHovered({ bool: true, index: i })}
              onMouseLeave={() => setIsHovered({ bool: false, index: null })}
              className="relative block pb-3 border border-zinc-700 hover:border-zinc-500 rounded-md overflow-hidden duration-300 ease-in-out"
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

              <div className="relative" style={{ minHeight: "200px" }}>
                <img
                  src={
                    item?.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`
                      : "/no-image.png"
                  }
                  className="w-full h-full object-cover"
                />
                <div className="mb-5 mr-4 absolute bottom-0 right-0 size-12 bg-rose-400 rounded-full grid place-items-center text-xl font-semibold">
                  {item?.vote_average ? item?.vote_average.toFixed(1) : "N/A"}
                </div>
              </div>

              <div className="mt-2 h-20">
                <h1 className=" px-2 text-2xl">
                  {item?.name ||
                    item?.title ||
                    item?.original_name ||
                    item?.original_title}
                </h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
