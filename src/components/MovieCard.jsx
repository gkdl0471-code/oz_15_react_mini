import "./MovieCard.scss";

export function MovieCard({ title, rating, posterUrl, onClick }) {
  const displayRating =
    typeof rating === "number" && !Number.isNaN(rating)
      ? rating.toFixed(1)
      : "N/A";

  return (
    <div className="cardBox" onClick={onClick}>
      <img src={posterUrl} alt={title} className="movie-poster" />
      <h3>{title}</h3>
      <p>⭐ {displayRating}</p>
    </div>
  );
}
