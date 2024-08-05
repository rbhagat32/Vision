import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetMovie, removeMovie } from "../store/actions/MovieActions";
import Loading from "../utils/Loading";
import { IoArrowBackOutline, IoGlobeOutline } from "react-icons/io5";
import Button from "../components/Button";
import FreemodeSwiper from "../components/FreemodeSwiper";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const movie = useSelector((state) => state.MovieReducer.movie);

  useEffect(() => {
    setLoading(true);
    dispatch(asyncGetMovie(id)).finally(() => {
      setLoading(false);
    });

    return () => {
      dispatch(removeMovie());
    };
  }, []);

  return loading ? (
    <Loading height="h-screen" size="size-14" />
  ) : (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.8),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${movie?.details?.backdrop_path})`,
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
          <a href={movie?.details?.homepage} target="_blank">
            <IoGlobeOutline className="text-2xl md:text-3xl" />
          </a>
          <a
            href={`https://www.imdb.com/title/${movie?.details?.imdb_id}`}
            target="_blank"
          >
            <p className="text-xl md:text-2xl font-bold">imdb</p>
          </a>
        </div>

        <div className="mt-5 w-full flex gap-4 md:gap-10">
          <div className="w-full max-w-72 shadow-lg">
            <img
              src={
                movie?.details?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie?.details?.poster_path}`
                  : "/no-image.png"
              }
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 max-w-[25ch] sm:max-w-[40ch] md:max-w-[60ch] lg:max-w-[80ch]">
              <h1 className="text-rose-400">
                Rating :{" "}
                {movie?.details?.vote_average
                  ? movie?.details?.vote_average.toFixed(1)
                  : "N/A"}
                <small className="text-[10px]">/10</small>
              </h1>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
                {movie?.details?.name ||
                  movie?.details?.title ||
                  movie?.details?.original_name ||
                  movie?.details?.original_title}
              </h1>
              <h1 className="text-zinc-400 lg:text-lg">
                {/* mobile */}
                <div className="block md:hidden">
                  {movie?.details?.overview.slice(0, 100) + "..."}
                </div>

                {/* laptop */}
                <div className="hidden md:block">{movie?.details?.tagline}</div>
                <p className="mt-5 hidden md:block text-4xl font-semibold text-rose-400">
                  Overview:
                </p>
                <div className="hidden md:block">
                  {movie?.details?.overview}
                </div>
              </h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              {movie?.details?.genres.map((genre, i) => (
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
          {movie?.watchProviders?.flatrate?.length > 0 && (
            <div className="mt-5">
              <h1 className="text-2xl font-semibold text-rose-400 mt-10 mb-3">
                Watch Now :
              </h1>
              <div className="flex gap-10 flex-wrap">
                {movie?.watchProviders?.flatrate?.map((provider, i) => (
                  <a
                    href={movie?.watchProviders?.link}
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

          {movie?.watchProviders?.buy?.length > 0 && (
            <div className="mt-5">
              <h1 className="text-2xl font-semibold text-rose-400 mt-10 mb-3">
                Buy :
              </h1>
              <div className="flex gap-10 flex-wrap">
                {movie?.watchProviders?.buy?.map((provider, i) => (
                  <a
                    href={movie?.watchProviders?.link}
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

          {movie?.watchProviders?.rent?.length > 0 && (
            <div className="mt-5">
              <h1 className="text-2xl font-semibold text-rose-400 mt-10 mb-3">
                Rent :
              </h1>
              <div className="flex gap-10 flex-wrap">
                {movie?.watchProviders?.rent?.map((provider, i) => (
                  <a
                    href={movie?.watchProviders?.link}
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
          {movie?.recommendations?.length > 0 && (
            <div className="mt-12">
              <h1 className="text-4xl font-semibold text-rose-400 mt-10 mb-3">
                Recommended :
              </h1>

              <FreemodeSwiper
                items={movie?.recommendations}
                mediaType="movie"
              />
            </div>
          )}
        </div>

        <div>
          {movie?.similar?.length > 0 && (
            <div className="mt-12">
              <h1 className="text-4xl font-semibold text-rose-400 mt-10 mb-3">
                Similar Movies :
              </h1>

              <FreemodeSwiper items={movie?.similar} mediaType="movie" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
