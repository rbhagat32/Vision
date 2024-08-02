import React, { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import Loading from "../utils/Loading";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { BiSearch, BiSolidCameraMovie } from "react-icons/bi";
import { RiFireFill } from "react-icons/ri";
import { BsStars, BsPeopleFill } from "react-icons/bs";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { IoMenuOutline, IoCloseSharp } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";

export default function Navbar() {
  const sideNavData = [
    {
      icon: <RiFireFill className="mt-0.5" />,
      title: "Trending",
      to: "/trending",
    },
    {
      icon: <BsStars className="mt-0.5" />,
      title: "Popular",
      to: "/popular",
    },
    {
      icon: <BiSolidCameraMovie className="mt-0.5" />,
      title: "Movies",
      to: "/movies",
    },
    {
      icon: <PiTelevisionSimpleFill className="mt-0.5" />,
      title: "TV Shows",
      to: "/tv-shows",
    },
    {
      icon: <BsPeopleFill className="mt-0.5" />,
      title: "People",
      to: "/people",
    },
    {
      icon: <IoMdContact className="mt-0.5" />,
      title: "Contact Us",
      to: "/contact",
    },
  ];

  // hide/unhide top nav on scroll
  const [isHidden, setIsHidden] = useState(false);

  const navbarVariants = {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: 0,
    },
  };

  const { scrollY } = useScroll();
  const prevY = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - prevY.current;

    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      prevY.current = y;
    }
  });

  // hide/unhide side nav and control scroll accordingly
  const [sideBar, setSideBar] = useState(false);
  useEffect(() => {
    if (sideBar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [sideBar]);

  // search query state
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch search data from api when search query changes
  useEffect(() => {
    // before fetching data, set loading to true
    setLoading(true);
    if (query.length > 0) {
      axios
        .get(`/search/multi?query=${query}`)
        .then((res) => {
          setSearchData(res.data.results);
          // after fetching data, set loading to false
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <>
      {/* Top Nav */}
      <motion.nav
        variants={navbarVariants}
        onFocusCapture={() => setIsHidden(false)}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3 }}
        className="fixed z-[999] mt-2 py-2 px-4 md:px-12 w-full flex justify-between items-center"
      >
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setSideBar(!sideBar)}
            className="bg-transparent border border-white rounded-full p-1"
          >
            {sideBar ? (
              <IoCloseSharp className="text-3xl" />
            ) : (
              <IoMenuOutline className="text-3xl" />
            )}
          </button>

          <Link
            to="/"
            onClick={() => setSideBar(false)}
            className="bg-violet-500 w-20 h-10"
          ></Link>
        </div>

        <div className="glass relative rounded-full">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsHidden(false);
            }}
            className="outline-none border border-white rounded-full text-white placeholder:text-white bg-transparent py-2 px-6 w-56 md:w-72 lg:w-96"
            type="text"
            placeholder="Search"
          />
          <div className="text-lg absolute top-0 right-0 pt-2 pr-3">
            {query.length > 0 ? (
              <button className="text-lg" onClick={() => setQuery("")}>
                <IoCloseSharp />
              </button>
            ) : (
              <div className="cursor-default mt-1">
                <BiSearch />
              </div>
            )}
          </div>

          {/* Searches */}
          {query.length > 0 && (
            <div className="bg-zinc-800 rounded-lg absolute top-[110%] w-full max-h-80 overflow-auto">
              {loading ? (
                <Loading />
              ) : (
                searchData.map((item, i) => {
                  return (
                    <Link
                      to=""
                      key={i}
                      className="flex gap-3 md:gap-4 items-center p-4 hover:bg-violet-500 rounded-lg duration-300 ease-in-out"
                    >
                      <div className="size-16 md:size-20 lg:size-28 flex-shrink-0 shadow-lg">
                        <img
                          loading="eager"
                          src={
                            item?.backdrpo_path ||
                            item?.poster_path ||
                            item?.profile_path
                              ? `https://image.tmdb.org/t/p/original/${
                                  item?.backdrop_path ||
                                  item?.poster_path ||
                                  item?.profile_path
                                }`
                              : "/no-image.webp"
                          }
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <h2 className="text-sm md:text-md lg:text-xl">
                        {item?.name ||
                          item?.title ||
                          item?.original_name ||
                          item?.original_title}
                      </h2>
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>
      </motion.nav>

      {/* Side Nav */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={sideBar ? { x: 0 } : { x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed z-[998] h-screen w-52 md:w-60 lg:w-72 xl:w-84 top-0 left-0 border-r border-zinc-600 bg-zinc-900/90"
      >
        <div className="relative top-24 flex flex-col gap-8 px-4 md:px-8 text-xl lg:text-2xl">
          {sideNavData.map((item, i) => (
            <React.Fragment key={i}>
              <Link
                to={item.to}
                onClick={() => setSideBar(false)}
                className="flex gap-2 items-center hover:bg-violet-500 pl-4 py-4 rounded-lg duration-300 ease-in-out"
              >
                {item.icon}
                {item.title}
              </Link>

              {i === sideNavData.length - 2 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </>
  );
}
