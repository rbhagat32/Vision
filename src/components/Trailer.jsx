import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { IoCloseSharp } from "react-icons/io5";

export default function Trailer({ link, setShowPlayer }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed z-10 w-screen h-screen grid place-items-center bg-zinc-900/90 overflow-hidden">
      <div className="relative top-5 w-full h-full grid place-items-center">
        <button
          onClick={() => setShowPlayer(false)}
          className="absolute z-[11] top-[80px] right-[5%] p-1 bg-transparent border-2 rounded-full"
        >
          <IoCloseSharp className="text-4xl" />
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
