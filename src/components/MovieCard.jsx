import "./MovieCard.scss";

export function MovieCard({ title, rating, posterUrl, onClick }) {
  return (
    <div className="cardBox" onClick={onClick}>
      <img src={posterUrl} alt={title} className="movie-poster"/>
      <h3>{title}</h3>
      <p>⭐ {rating.toFixed(1)}</p>
    </div>
  );
}
