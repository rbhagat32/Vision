import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button({ text = "Explore More", to }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="px-5 py-2.5 text-md rounded-md w-fit font-medium border border-rose-400 hover:border-transparent bg-transparent hover:bg-rose-400 shadow-md shadow-rose-400 duration-200 ease-in-out"
    >
      {text}
    </button>
  );
}
