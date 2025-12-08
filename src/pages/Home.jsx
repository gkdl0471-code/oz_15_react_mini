import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeCarousel from "../components/HomeCarousel";
import PopularCarousel from "../components/PopularCarousel";
import { selectPopularMovies, selectMovieLoading, selectMovieError } from "../RTK/selector";
import "./Home.scss";

export default function Home({ posterURL }) {
  const navigate = useNavigate();
  const movies = useSelector(selectPopularMovies) || [];
  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="home-page">
      <section className="home-latest">
        <div className="home-latest__header">
          <h2 className="home-latest__title">NEW</h2>
          <button
            className="home-latest__more-btn"
            onClick={() => navigate("/Latest")}
          >
            MORE
          </button>
        </div>
        <HomeCarousel
          movies={movies.slice(0, 7)}
          posterURL={posterURL}
          onClickCard={handleCardClick}
        />
      </section>

      <section className="home-popular">
        <div className="home-popular__header">
          <h2 className="home-popular__title">인기</h2>
          <button
            className="home-popular__more-btn"
            onClick={() => navigate("/popular")}
          >
            MORE
          </button>
        </div>

        <PopularCarousel
          movies={movies.slice(0, 20)}
          posterURL={posterURL}
          onClickCard={handleCardClick}
        />
      </section>
    </div>
  );
}
