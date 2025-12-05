import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Popular from "./pages/Popular";
import Latest from "./pages/Latest";
import Genre from "./pages/Genre";
import Search from "./pages/Search"; // ✅ 추가

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPopularMovies } from "./RTK/thunk";

function App() {
  const posterURL = "https://image.tmdb.org/t/p/w500";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovies(3)); // 예: 1~3페이지
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home posterURL={posterURL} />} />
        <Route path="/popular" element={<Popular posterURL={posterURL} />} />
        <Route path="/latest" element={<Latest posterURL={posterURL} />} />
        <Route path="/genre" element={<Genre posterURL={posterURL} />} />
        <Route path="/detail/:id" element={<Detail posterURL={posterURL} />} />
        <Route path="/search" element={<Search posterURL={posterURL} />} />
      </Route>
    </Routes>
  );
}

export default App;
