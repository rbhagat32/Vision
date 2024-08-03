import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Button from "../components/Button";

export default function App({ data, mediaType }) {
  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      // cssMode={true} adds smooth sliding but doesnot allow swipe with cursor
      modules={[Autoplay]}
      className="mySwiper"
    >
      {data.map((item, i) => (
        <SwiperSlide key={i}>
          <div
            className="h-[70vh]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original/${
                item?.backdrop_path || item?.poster_path
              })`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
              minHeight: "70vh",
            }}
          >
            <div className="px-4 md:px-12 py-10 w-full h-full flex flex-col gap-4 justify-end">
              <h1 className="w-full md:max-w-[18ch] font-black text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none">
                {item?.name ||
                  item?.title ||
                  item?.original_name ||
                  item?.original_title}
              </h1>
              <p className="max-w-[80ch] text-zinc-300 text-sm md:text-lg">
                {item?.overview.length > 180
                  ? item?.overview.slice(0, 180) + "..."
                  : item?.overview}
              </p>
              <Button
                text="Explore More"
                to={`/${item?.media_type || mediaType}/${item?.id}`}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
