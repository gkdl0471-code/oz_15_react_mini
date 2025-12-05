import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import "./Genre.scss";

export default function Genre({ posterURL }) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [error, setError] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_ACCESS_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoadingGenres(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=ko-KR`
        );

        if (!res.ok) {
          throw new Error(`장르 목록 API 요청 실패 (status: ${res.status})`);
        }

        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, [TMDB_API_KEY]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setLoadingMovies(true);
        setError(null);

        let url = "";

        if (selectedGenreId) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=ko-KR&page=1&with_genres=${selectedGenreId}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ko-KR&page=2`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`장르별 영화 API 요청 실패 (status: ${res.status})`);
        }

        const data = await res.json();
        setMovies(data.results || []);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoadingMovies(false);
      }
    };

    fetchMoviesByGenre();
  }, [TMDB_API_KEY, selectedGenreId]);

  const handleGenreClick = (genreId) => {
    if (selectedGenreId === genreId) {
      setSelectedGenreId(null);
    } else {
      setSelectedGenreId(genreId);
    }
  };

  return (
    <div className="page genre-page">
      <header className="page-header">
        <h2>장르별 영화</h2>
        <p>원하는 장르를 선택해서 영화를 찾아보세요.</p>
      </header>

      <section className="genre-filter">
        <button
          type="button"
          className={`genre-chip ${selectedGenreId === null ? "active" : ""}`}
          onClick={() => setSelectedGenreId(null)}
        >
          전체
        </button>

        {loadingGenres ? (
          <span className="genre-loading">장르 불러오는 중...</span>
        ) : (
          genres.map((genre) => (
            <button
              key={genre.id}
              type="button"
              className={`genre-chip ${
                selectedGenreId === genre.id ? "active" : ""
              }`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </button>
          ))
        )}
      </section>

      {loadingMovies ? (
        <div>영화 불러오는 중...</div>
      ) : error ? (
        <div>에러: {error}</div>
      ) : (
        <section className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterUrl={posterURL + movie.poster_path}
              onClick={() => navigate(`/detail/${movie.id}`)}
            />
          ))}
        </section>
      )}
    </div>
  );
}
