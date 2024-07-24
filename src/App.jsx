import React, { useState } from "react";
import Routing from "./utils/Routing";
import Navbar from "./partials/Navbar";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Navbar />

      <div className="relative">
        <Routing />
      </div>
    </div>
  );
}
