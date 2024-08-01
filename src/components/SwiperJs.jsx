import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";

export default function SwiperJs({ items }) {
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
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              to=""
              className="block pb-4 border border-zinc-700 rounded-md overflow-hidden"
            >
              <div className="relative w-full h-full">
                <img
                  src={`https://image.tmdb.org/t/p/original/${
                    item.backdrop_path || item.poster_path || item.profile_path
                  }`}
                  className="w-full h-full object-cover"
                />
                <div className="mb-5 mr-4 absolute bottom-0 right-0 size-12 bg-violet-400 rounded-full grid place-items-center text-xl font-semibold">
                  {item?.vote_average ? item?.vote_average.toFixed(1) : "N/A"}
                </div>
              </div>

              <div className="mt-2 h-16 flex justify-start">
                <h1 className="px-2 text-2xl text-zinc-400">
                  {item.name ||
                    item.title ||
                    item.original_name ||
                    item.original_title}
                </h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
