import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Trending from "../pages/Trending";
import Popular from "../pages/Popular";
import Movies from "../pages/Movies";
import TvShows from "../pages/TvShows";
import People from "../pages/People";
import Contact from "../pages/Contact";

export default function Routing() {
  const loc = useLocation();

  return (
    <Routes location={loc} key={loc.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv-shows" element={<TvShows />} />
      <Route path="/people" element={<People />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
