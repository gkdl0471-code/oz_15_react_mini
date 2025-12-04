import { useNavigate } from "react-router-dom";
import "./MovieCard.scss";

export function MovieCard({ title, rating, posterUrl, onClick }) {
  return (
    <div className="cardBox" onClick={onClick}>
      <img
        src={posterUrl}
        alt={title}
        className="movie-poster"
      />

      <h3>{title}</h3>
      <p>⭐ {rating.toFixed(1)}</p>
    </div>
  );
}


export function MovieList({ movieList, posterURL }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-5 justify-center pt-5 px-[50px]">
      {movieList.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          rating={movie.vote_average}
          posterUrl={posterURL + movie.poster_path}
          onClick={() => navigate("/detail")}
        />
      ))}
    </div>
  );
}
