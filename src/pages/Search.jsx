import { getRegExp } from "korean-regexp";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MovieCard } from "../components/MovieCard";
import { selectMoviesByRegExp } from "../RTK/selector";
import "./Search.scss";

export default function Search({ posterURL }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("movie") || "";
  const reg = keyword ? getRegExp(keyword) : null;
  const movies = useSelector(selectMoviesByRegExp(reg));
  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  if (!keyword) {
    return (
      <div className="page search-page">
        <h2>영화 검색</h2>
        <p className="search-desc">상단 검색창에 영화 제목을 입력해 보세요.</p>
      </div>
    );
  }

  return (
    <div className="page search-page">
      <h2>
        &quot;{keyword}&quot; 검색 결과 ({movies.length}개)
      </h2>

      {movies.length === 0 ? (
        <p>일치하는 영화가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center pt-5 px-[50px]">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterUrl={
                movie.posterUrl || (posterURL + movie.poster_path)
              }
              onClick={() => handleCardClick(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
