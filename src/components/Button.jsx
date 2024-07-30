import React from "react";

export default function Button({ text = "button" }) {
  return (
    <button className="px-5 py-2.5 text-md rounded-md w-fit font-medium border border-violet-400 hover:border-transparent bg-transparent hover:bg-violet-500 shadow-sm shadow-violet-400 duration-200 ease-in-out">
      {text}
    </button>
  );
}
