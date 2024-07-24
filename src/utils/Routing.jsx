import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";

export default function Routing() {
  const loc = useLocation();

  return (
    <Routes location={loc} key={loc.pathname}>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
