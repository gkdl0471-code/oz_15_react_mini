import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectMovieById,
  selectMovieLoading,
  selectMovieError,
} from "../RTK/selector";
import "./Detail.scss";

export default function Detail({ posterURL }) {
  const { id } = useParams();
  const movieId = Number(id);
  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);
  const movie = useSelector(selectMovieById(movieId));

  if (loading) {return <div className="detail-page">상세 정보 로딩 중...</div>}
  if (error) {return <div className="detail-page">에러: {error}</div>}
  if (!movie) {return <div className="detail-page">영화 정보를 찾을 수 없습니다.</div>}

  const rating = movie.vote_average?.toFixed(1);
  const imageUrl = posterURL + (movie.backdrop_path || movie.poster_path);

  return (
    <div className="detail-page">
      <div className="container">
        <img className="poster-poster" src={imageUrl} alt={movie.title} />

        <div>
          <div className="title1">
            <h1>{movie.title}</h1>
            <span>⭐ {rating}</span>
          </div>

          <div>
            <div className="font-black">줄거리</div>
            <div>{movie.overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
