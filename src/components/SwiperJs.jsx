import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function SwiperJs({ items }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // set window width on resize
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
    if (windowWidth > 1024) {
      return 4;
    } else if (windowWidth >= 768) {
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
            <div className="flex flex-col gap-4">
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  item.backdrop_path || item.poster_path || item.profile_path
                }`}
                className="rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
