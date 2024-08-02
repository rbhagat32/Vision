import React, { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Cards from "../components/Cards";
import axios from "../utils/axios";
import { revertCapitalize } from "../utils/capitalize";

export default function Trending() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");

  const getTrending = () => {
    setLoading(true);
    axios
      .get(`/trending/${category}/${duration}`)
      .then((res) => {
        setTrending(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getTrending();
  }, [category, duration]);

  return loading ? (
    <Loading height="h-screen" size="size-14" />
  ) : (
    <div className="pb-10 px-4 md:px-12 pt-20 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <button onClick={() => navigate(-1)} className="mt-1.5">
            <IoArrowBackOutline className="text-3xl lg:text-4xl" />
          </button>
          <h1 className="text-4xl lg:text-5xl font-semibold">Trending</h1>
        </div>

        <div className="flex gap-2 lg:gap-4 items-center mt-2.5">
          <Dropdown
            title="Category"
            options={["all", "movie", "tv"]}
            setterFunction={(e) =>
              setCategory(revertCapitalize(e.target.value))
            }
          />
          <Dropdown
            title="Duration"
            options={["day", "week"]}
            setterFunction={(e) =>
              setDuration(revertCapitalize(e.target.value))
            }
          />
        </div>
      </div>

      <Cards data={trending} />
    </div>
  );
}
