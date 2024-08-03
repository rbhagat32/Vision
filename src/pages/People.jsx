import React, { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function People() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  document.title = `People`;

  const getPeople = () => {
    setLoading(true);
    axios
      .get(`/person/popular?page=${page}`)
      .then((res) => {
        console.log(res.data);
        setPeople((prev) => [...prev, ...res.data.results]);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPeople();
  }, []);

  const refreshInfiniteScroll = () => {
    setPeople([]);
    setPage(1);
    getPeople();
  };

  return loading && people.length === 0 ? (
    <Loading height="h-screen" size="size-14" />
  ) : (
    <div className="pb-10 px-4 md:px-12 pt-20 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <button onClick={() => navigate(-1)} className="mt-1.5">
            <IoArrowBackOutline className="text-3xl lg:text-4xl" />
          </button>
          <h1 className="text-4xl font-light">People</h1>
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        hasMore={true}
        next={getPeople}
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
        <Cards data={people} />
      </InfiniteScroll>
    </div>
  );
}
