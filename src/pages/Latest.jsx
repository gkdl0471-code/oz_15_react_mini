import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import "./Latest.scss";

export default function Latest({ posterURL }) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_ACCESS_KEY;

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`
        );

        if (!res.ok) {
          throw new Error(`최신 영화 API 요청 실패 (status: ${res.status})`);
        }

        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMovies();
  }, [TMDB_API_KEY]);

  if (loading) {
    return <div className="page latest-page">로딩 중...</div>;
  }

  if (error) {
    return <div className="page latest-page">에러: {error}</div>;
  }

  return (
    <div className="page latest-page">
      <header className="page-header">
        <h2>최신 영화</h2>
        <p>지금 상영 중인 최신 영화를 확인해보세요.</p>
      </header>

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
    </div>
  );
}
