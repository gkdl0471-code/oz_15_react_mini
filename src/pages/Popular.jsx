import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPopularMovies, selectMovieLoading, selectMovieError } from "../RTK/selector";
import { MovieCard } from "../components/MovieCard";
import "./Popular.scss";

export default function Popular({ posterURL }) {
  const navigate = useNavigate();
  const movies = useSelector(selectPopularMovies);
  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);

  if (loading) return <div className="page popular-page">로딩 중...</div>;
  if (error) return <div className="page popular-page">에러: {error}</div>;

  return (
    <div className="page popular-page">
      <header className="page-header">
        <h2>인기 영화</h2>
        <p>지금 가장 인기 있는 영화들을 만나보세요.</p>
      </header>

      <div className="flex flex-wrap gap-5 justify-center pt-5 px-[50px]">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            posterUrl={posterURL + movie.poster_path}
            onClick={() => navigate(`/detail/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
