import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "./Loading";
const Home = lazy(() => import("../pages/Home"));
const Trending = lazy(() => import("../pages/Trending"));
const Popular = lazy(() => import("../pages/Popular"));
const Movies = lazy(() => import("../pages/Movies"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const TvShows = lazy(() => import("../pages/TvShows"));
const TvShowDetails = lazy(() => import("../pages/TvShowDetails"));
const People = lazy(() => import("../pages/People"));
const PersonDetails = lazy(() => import("../pages/PersonDetails"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../partials/NotFound"));

export default function Routing() {
  const loc = useLocation();

  return (
    <Suspense fallback={<Loading height="h-[100vh]" size="size-14" />}>
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
    </Suspense>
  );
}
