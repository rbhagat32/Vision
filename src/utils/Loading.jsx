import React from "react";

export default function Loading({ height = "h-20", size = "size-10" }) {
  return (
    <div className={`w-full ${height} grid place-items-center`}>
      <div
        className={`${size} rounded-full border-4 border-t-green-500 border-zinc-700 animate-spin`}
      ></div>
    </div>
  );
}
