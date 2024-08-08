import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img src="/404.svg" />
      <h1 className="text-4xl font-semibold text-rose-400 mb-3">
        Page Not Found 😵
      </h1>
      <Link to="/" className="text-lg text-zinc-400">
        Go back to Home
      </Link>
    </div>
  );
}
