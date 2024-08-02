import React, { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Cards from "../components/Cards";
import axios from "../utils/axios";
import { capitalize, revertCapitalize } from "../utils/capitalize";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Popular() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("movie");
  const [page, setPage] = useState(1);
  document.title = `Popular - ${capitalize(category)}`;

  const getPopular = () => {
    setLoading(true);
    axios
      .get(`/${category}/popular?page=${page}`)
      .then((res) => {
        setPopular((prev) => [...prev, ...res.data.results]);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Reset popular and page when category changes
    setPopular([]);
    setPage(1);
    getPopular();
  }, [category]);

  const refreshInfiniteScroll = () => {
    setPopular([]);
    setPage(1);
    getPopular();
  };

  return (
    <div className="pb-10 px-4 md:px-12 pt-20 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <button onClick={() => navigate("/")} className="mt-1.5">
            <IoArrowBackOutline className="text-3xl lg:text-4xl" />
          </button>
          <h1 className="text-4xl lg:text-5xl font-semibold">Popular</h1>
        </div>

        <div className="flex gap-2 lg:gap-4 items-center mt-2.5">
          <Dropdown
            label={category}
            options={["movie", "tv"]}
            setterFunction={(e) =>
              setCategory(revertCapitalize(e.target.value))
            }
          />
        </div>
      </div>

      {loading && popular.length === 0 ? (
        <Loading height="h-screen" size="size-14" />
      ) : (
        <InfiniteScroll
          dataLength={popular.length}
          hasMore={true}
          next={getPopular}
          loader={<Loading size="size-14" />}
          endMessage={
            <p className="w-fit mx-auto mt-10 text-lg text-zinc-400">
              No More Movies !
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
          <Cards data={popular} />
        </InfiniteScroll>
      )}
    </div>
  );
}
