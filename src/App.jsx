import './App.scss'
import { MovieList } from './components/MovieCard'
import { MovieDetail } from './components/MovieDetail';
import movieListData from './data/movieListData.json';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Layout } from './components/Layout';

function App() {
  const posterURL = "https://image.tmdb.org/t/p/w500"
  const movieList= movieListData.results;
  const navigate = useNavigate();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieList movieList={movieList} posterURL={posterURL}/>} />
        <Route path="/detail" element={<MovieDetail posterURL={posterURL} />} />
      </Route>
    </Routes>
  );
}

export default App
