import React, { useEffect, useState } from "react";
import Routing from "./utils/Routing";
import Navbar from "./partials/Navbar";

export default function App() {
  useEffect(() => {
    window.addEventListener("selectstart", (e) => e.preventDefault());

    return () => {
      window.removeEventListener("selectstart", (e) => e.preventDefault());
    };
  }, []);

  return (
    <div className="w-screen h-screen">
      <Navbar />

      <div className="relative">
        <Routing />
      </div>
    </div>
  );
}
