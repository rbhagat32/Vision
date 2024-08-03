import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Trending from "../pages/Trending";
import Popular from "../pages/Popular";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import TvShows from "../pages/TvShows";
import TvShowDetails from "../pages/TvShowDetails";
import People from "../pages/People";
import PersonDetails from "../pages/PersonDetails";
import Contact from "../pages/Contact";
import NotFound from "../partials/NotFound";

export default function Routing() {
  const loc = useLocation();

  return (
    <Routes location={loc} key={loc.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/tv-shows" element={<TvShows />} />
      <Route path="/tv/:id" element={<TvShowDetails />} />
      <Route path="/people" element={<People />} />
      <Route path="/person/:id" element={<PersonDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
