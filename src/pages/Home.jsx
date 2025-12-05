import { useNavigate } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import { useSelector } from "react-redux";
import { selectPopularMovies, selectMovieLoading, selectMovieError } from "../RTK/selector";

export default function Home({ posterURL }) {
  const navigate = useNavigate();
  const movies = useSelector(selectPopularMovies);
  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);

  if (loading) return <div className="page popular-page">로딩 중...</div>;
  if (error) return <div className="page popular-page">에러: {error}</div>;

  return (
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
  );
}
