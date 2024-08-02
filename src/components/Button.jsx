import React from "react";

export default function Button({ text = "Watch Trailer" }) {
  return (
    <button className="px-5 py-2.5 text-md rounded-md w-fit font-medium border border-rose-400 hover:border-transparent bg-transparent hover:bg-rose-400 shadow-md shadow-rose-400 duration-200 ease-in-out">
      {text}
    </button>
  );
}
