import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomeCarousel.scss";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

export default function HomeCarousel({
  movies = [],
  posterURL,
  onClickCard,
  title,
}) {
  const carouselMovies = movies.slice(0, 7);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeMovie = carouselMovies[activeIndex] || null;

  const backgroundImageUrl = useMemo(() => {
    if (!activeMovie) return "";
    if (activeMovie.backdrop_path) {
      return BACKDROP_BASE_URL + activeMovie.backdrop_path;
    }
    if (activeMovie.poster_path) {
      return posterURL + activeMovie.poster_path;
    }
    return "";
  }, [activeMovie, posterURL]);

  const getCardImageUrl = (movie) => {
    if (!movie) return "";
    if (movie.backdrop_path) return BACKDROP_BASE_URL + movie.backdrop_path;
    if (movie.poster_path) return posterURL + movie.poster_path;
    return "";
  };

  const truncate = (text, max = 20) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  if (!carouselMovies.length) return null;

  return (
    <section className="home-carousel">
      {backgroundImageUrl && (
        <div
          className="home-carousel__bg"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      <div className="home-carousel__content">
        {title && <h2 className="home-carousel__title">{title}</h2>}

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          className="home-carousel__swiper"
          loop
          centeredSlides
          slidesPerView={1.5}
          spaceBetween={24}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          onSwiper={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          breakpoints={{
            768: { slidesPerView: 1.7, spaceBetween: 28 },
            1024: { slidesPerView: 2, spaceBetween: 32 },
          }}
        >
          {carouselMovies.map((movie, index) => {
            if (!movie) return null;

            const imageUrl = getCardImageUrl(movie);
            const rating = movie.vote_average
              ? movie.vote_average.toFixed(1)
              : null;

            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={movie.id}>
                <article
                  className={`home-carousel__card ${
                    isActive ? "home-carousel__card--active" : ""
                  }`}
                >
                  {imageUrl && (
                    <div
                      className="home-carousel__image-wrap"
                      onClick={() => onClickCard?.(movie.id)}
                    >
                      <img
                        className="home-carousel__poster"
                        src={imageUrl}
                        alt={movie.title}
                      />
                    </div>
                  )}

                  <div className="home-carousel__info">
                    <h3 className="home-carousel__movie-title">
                      {truncate(movie.title, 20)}
                    </h3>

                    {movie.release_date && (
                      <p className="home-carousel__release">
                        개봉일: {movie.release_date}
                      </p>
                    )}

                    {rating && (
                      <p className="home-carousel__rating">⭐ {rating}</p>
                    )}

                    <p className="home-carousel__overview">
                      {truncate(movie.overview, 40)}
                    </p>

                    <button
                      className="home-carousel__more-btn"
                      onClick={() => onClickCard?.(movie.id)}
                    >
                      자세히 보기
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
