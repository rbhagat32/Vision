import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetTvShow, removeTvShow } from "../store/actions/TvActions";
import Loading from "../utils/Loading";
import { IoArrowBackOutline, IoGlobeOutline } from "react-icons/io5";
import Button from "../components/Button";
import FreemodeSwiper from "../components/FreemodeSwiper";

export default function TvShowDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const tvShow = useSelector((state) => state.TvReducer.tvShow);
  document.title =
    `TV - ${tvShow?.details?.name || tvShow?.details?.title}` || "TV Show";

  useEffect(() => {
    setLoading(true);
    dispatch(asyncGetTvShow(id)).finally(() => {
      setLoading(false);
    });

    return () => {
      dispatch(removeTvShow());
    };
  }, []);

  return loading ? (
    <Loading height="h-screen" size="size-14" />
  ) : (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${tvShow?.details?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
      className="pb-10 px-4 md:px-12 pt-20 w-screen h-screen overflow-hidden"
    >
      <div className="w-full h-full overflow-y-auto">
        <div className="flex gap-3 items-center">
          <button onClick={() => navigate(-1)}>
            <IoArrowBackOutline className="text-3xl md:text-4xl" />
          </button>
          <a href={tvShow?.details?.homepage} target="_blank">
            <IoGlobeOutline className="text-2xl md:text-3xl" />
          </a>
          <a
            href={`https://www.imdb.com/title/${tvShow?.details?.imdb_id}`}
            target="_blank"
          >
            <p className="text-xl md:text-2xl font-bold">imdb</p>
          </a>
        </div>

        <div className="mt-5 w-full flex gap-4 md:gap-10">
          <div className="w-full max-w-72 shadow-lg">
            <img
              src={
                tvShow?.details?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${tvShow?.details?.poster_path}`
                  : "/no-image.png"
              }
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 max-w-[25ch] sm:max-w-[40ch] md:max-w-[60ch] lg:max-w-[80ch]">
              <h1 className="text-rose-400">
                Rating :{" "}
                {tvShow?.details?.vote_average
                  ? tvShow?.details?.vote_average.toFixed(1)
                  : "N/A"}
                <small className="text-[10px]">/10</small>
              </h1>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
                {tvShow?.details?.name ||
                  tvShow?.details?.title ||
                  tvShow?.details?.original_name ||
                  tvShow?.details?.original_title}
              </h1>
              <h1 className="text-zinc-400 lg:text-lg">
                {/* mobile */}
                <div className="block md:hidden">
                  {tvShow?.details?.overview.slice(0, 100) + "..."}
                </div>

                {/* laptop */}
                <div className="hidden md:block">
                  {tvShow?.details?.tagline}
                </div>
                <p className="mt-5 hidden md:block text-4xl font-semibold text-rose-400">
                  Overview:
                </p>
                <div className="hidden md:block">
                  {tvShow?.details?.overview}
                </div>
              </h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tvShow?.details?.genres.map((genre, i) => (
                <div
                  key={i}
                  className="mt-2 px-4 py-1.5 rounded-full border-2 border-zinc-400"
                >
                  {genre.name}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Button text="Watch Trailer" />
            </div>
          </div>
        </div>

        <div>
          {tvShow?.watchProviders?.flatrate?.length > 0 && (
            <div className="mt-5">
              <h1 className="text-2xl font-semibold text-rose-400 mt-10 mb-3">
                Watch Now :
              </h1>
              <div className="flex gap-10 flex-wrap">
                {tvShow?.watchProviders?.flatrate?.map((provider, i) => (
                  <a
                    href={tvShow?.watchProviders?.link}
                    target="_blank"
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92/${provider?.logo_path}`}
                      className="size-10 rounded-lg"
                    />
                    <p className="text-lg font-semibold">
                      {provider.provider_name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {tvShow?.watchProviders?.buy?.length > 0 && (
            <div className="mt-5">
              <h1 className="text-2xl font-semibold text-rose-400 mt-10 mb-3">
                Buy :
              </h1>
              <div className="flex gap-10 flex-wrap">
                {tvShow?.watchProviders?.buy?.map((provider, i) => (
                  <a
                    href={tvShow?.watchProviders?.link}
                    target="_blank"
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92/${provider?.logo_path}`}
                      className="size-10 rounded-lg"
                    />
                    <p className="text-lg font-semibold">
                      {provider.provider_name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {tvShow?.watchProviders?.rent?.length > 0 && (
            <div className="mt-5">
              <h1 className="text-2xl font-semibold text-rose-400 mt-10 mb-3">
                Rent :
              </h1>
              <div className="flex gap-10 flex-wrap">
                {tvShow?.watchProviders?.rent?.map((provider, i) => (
                  <a
                    href={tvShow?.watchProviders?.link}
                    target="_blank"
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92/${provider?.logo_path}`}
                      className="size-10 rounded-lg"
                    />
                    <p className="text-lg font-semibold">
                      {provider.provider_name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {tvShow?.recommendations?.length > 0 && (
            <div className="mt-12">
              <h1 className="text-4xl font-semibold text-rose-400 mt-10 mb-3">
                Recommended :
              </h1>

              <FreemodeSwiper
                items={tvShow?.recommendations}
                mediaType="tv-show"
              />
            </div>
          )}
        </div>

        <div>
          {tvShow?.similar?.length > 0 && (
            <div className="mt-12">
              <h1 className="text-4xl font-semibold text-rose-400 mt-10 mb-3">
                Similar Movies :
              </h1>

              <FreemodeSwiper items={tvShow?.similar} mediaType="tv-show" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
