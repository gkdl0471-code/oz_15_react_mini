import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMovieById, selectMovieLoading, selectMovieError } from "../RTK/selector";
import "./Detail.scss";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const GENRE_MAP = {
  28: "액션",
  12: "모험",
  16: "애니메이션",
  35: "코미디",
  80: "범죄",
  99: "다큐멘터리",
  18: "드라마",
  10751: "가족",
  14: "판타지",
  36: "역사",
  27: "공포",
  10402: "음악",
  9648: "미스터리",
  10749: "로맨스",
  878: "SF",
  10770: "TV 영화",
  53: "스릴러",
  10752: "전쟁",
  37: "서부",
};

export default function Detail({ posterURL }) {
  const { id } = useParams();
  const movieId = Number(id);

  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);
  const movie = useSelector(selectMovieById(movieId));

  if (loading) {
    return <div className="detail-page">상세 정보 로딩 중...</div>;
  }
  if (error) {
    return <div className="detail-page">에러: {error}</div>;
  }
  if (!movie) {
    return <div className="detail-page">영화 정보를 찾을 수 없습니다.</div>;
  }

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "정보 없음";

  const backgroundImageUrl =
    movie.backdrop_path
      ? BACKDROP_BASE_URL + movie.backdrop_path
      : movie.poster_path
      ? posterURL + movie.poster_path
      : "";

  const posterImageUrl =
    movie.poster_path
      ? posterURL + movie.poster_path
      : movie.backdrop_path
      ? BACKDROP_BASE_URL + movie.backdrop_path
      : "";

  const genres = movie.genre_ids?.map((id) => GENRE_MAP[id]).filter(Boolean) || [];

  const releaseDate = movie.release_date || "정보 없음";

  return (
    <div className="detail-page">
      {backgroundImageUrl && (
        <div
          className="detail-page__bg"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      <div className="detail-page__overlay" />

      <div className="detail-page__content">
        <div className="detail-page__card">
          {posterImageUrl && (
            <div className="detail-page__poster-wrap">
              <img
                className="detail-page__poster"
                src={posterImageUrl}
                alt={movie.title}
              />
            </div>
          )}

          <div className="detail-page__info">
            <h1 className="detail-page__title">{movie.title}</h1>

            <div className="detail-page__meta">
              <span className="detail-page__rating">⭐ {rating}</span>

              {genres.length > 0 && (
                <span className="detail-page__genres">
                  {genres.join(" · ")}
                </span>
              )}

              <span className="detail-page__release">
                개봉일: {releaseDate}
              </span>
            </div>

            <div className="detail-page__section">
              <h2 className="detail-page__section-title">줄거리</h2>
              <p className="detail-page__overview">
                {movie.overview || "등록된 줄거리가 없습니다."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
