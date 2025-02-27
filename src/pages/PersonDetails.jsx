import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncGetPerson, removePerson } from "../store/actions/PersonActions";
import Loading from "../utils/Loading";
import { IoArrowBackOutline, IoGlobeOutline } from "react-icons/io5";
import Cards from "../components/Cards";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

export default function PersonDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const person = useSelector((state) => state.PersonReducer.person);

  if (person?.details?.name || person?.details?.original_name) {
    document.title =
      `Person - ${person?.details?.name || person?.details?.original_name}` ||
      "Person";
  }

  useEffect(() => {
    setLoading(true);
    dispatch(asyncGetPerson(id)).finally(() => {
      setLoading(false);
    });

    return () => {
      dispatch(removePerson());
    };
  }, []);

  return loading ? (
    <Loading height="h-screen" size="size-14" />
  ) : (
    <div className="px-4 md:px-12 pt-20 w-screen h-screen overflow-hidden">
      <div className="w-full h-full overflow-y-auto">
        <div className="flex gap-3 items-center">
          <button onClick={() => navigate(-1)}>
            <IoArrowBackOutline className="text-3xl md:text-4xl" />
          </button>
          <a href={person?.details?.homepage} target="_blank">
            <IoGlobeOutline className="text-2xl md:text-3xl" />
          </a>
          <a
            href={`https://www.imdb.com/name/${person?.details?.imdb_id}`}
            target="_blank"
          >
            <p className="text-xl md:text-2xl font-bold">imdb</p>
          </a>
        </div>

        <div className="mt-5 w-full flex gap-4 md:gap-10">
          <div className="w-full max-w-72 shadow-lg">
            <img
              src={
                person?.details?.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${person?.details?.profile_path}`
                  : "/no-image.png"
              }
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 max-w-[25ch] sm:max-w-[40ch] md:max-w-[60ch] lg:max-w-[80ch]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">
                {person?.details?.name || person?.details?.original_name}
              </h1>
              <h1 className="text-zinc-400 lg:text-lg">
                <p className="mt-5 text-xl md:text-3xl font-semibold text-rose-400">
                  Biography :
                </p>
                <div className="mt-2">
                  {person?.details?.biography
                    ? person?.details?.biography.length > 280
                      ? person?.details?.biography?.slice(0, 280) + "..."
                      : person?.details?.biography
                    : "No data available currently."}
                </div>
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-4xl font-semibold text-rose-400 mt-10 mb-5">
            Popular Movies / TV Shows :
          </h1>
          <Cards data={person?.credits} backToTop={false} />
        </div>

        {/* spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
