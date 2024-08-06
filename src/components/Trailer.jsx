import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Trailer({ link, setShowPlayer }) {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div
      onClick={() => setShowPlayer(false)}
      className="fixed z-10 w-screen h-screen grid place-items-center bg-zinc-900/90 overflow-hidden"
    >
      <div className="relative top-5 w-full h-full grid place-items-center">
        <button
          onClick={() => setShowPlayer(false)}
          className="absolute z-[11] left-[8%] p-1 bg-black border-2 hover:border-rose-400 rounded-full duration-300 ease-in-out"
        >
          <IoArrowBackOutline className="text-4xl" />
        </button>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${link}`}
          controls={true}
          playing={true}
          width="90%"
          height="80%"
        />
      </div>
    </div>
  );
}
