import React, { useEffect } from "react";
import Navbar from "./partials/Navbar";
import Routing from "./utils/Routing";

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

      <div className="relative overflow-x-hidden">
        <Routing />
      </div>
    </div>
  );
}
