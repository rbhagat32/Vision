import React, { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Cards from "../components/Cards";
import axios from "../utils/axios";
import { capitalize, revertCapitalize } from "../utils/capitalize";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Movies() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  document.title = `Movies - ${capitalize(category)}`;

  const getMovies = () => {
    setLoading(true);
    axios
      .get(`/movie/${category}?page=${page}`)
      .then((res) => {
        setMovies((prev) => [...prev, ...res.data.results]);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    // Reset movies and page when category changes
    setMovies([]);
    setPage(1);
    getMovies();
  }, [category]);

  const refreshInfiniteScroll = () => {
    setMovies([]);
    setPage(1);
    getMovies();
  };

  return loading && movies.length === 0 ? (
    <Loading height="h-screen" size="size-14" />
  ) : (
    <div className="pb-10 px-4 md:px-12 pt-20 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <button onClick={() => navigate(-1)} className="mt-1.5">
            <IoArrowBackOutline className="text-3xl lg:text-4xl" />
          </button>
          <h1 className="text-4xl font-light">Movies</h1>
        </div>

        <div className="flex gap-2 lg:gap-4 items-center mt-2.5">
          <Dropdown
            label={category}
            options={["now_playing", "popular", "top_rated", "upcoming"]}
            setterFunction={(e) =>
              setCategory(revertCapitalize(e.target.value))
            }
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        hasMore={true}
        next={getMovies}
        loader={<Loading size="size-14" />}
        endMessage={
          <p className="w-fit mx-auto mt-10 text-lg text-zinc-400">
            That's All for Now !
          </p>
        }
        refreshFunction={refreshInfiniteScroll}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }} className="mb-4">
            &#8595; Pull down to refresh
          </h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }} className="mb-4">
            &#8593; Release to refresh
          </h3>
        }
      >
        <Cards data={movies} mediaType="movie" />
      </InfiniteScroll>
    </div>
  );
}
