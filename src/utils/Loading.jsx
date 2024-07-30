import React from "react";

export default function Loading({ height = "h-20" }) {
  return (
    <div className={`w-full ${height} grid place-items-center`}>
      <div className="size-10 rounded-full border-4 border-t-green-500 border-zinc-700 animate-spin"></div>
    </div>
  );
}
