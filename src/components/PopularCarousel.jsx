import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MovieCard } from "./MovieCard";
import "./PopularCarousel.scss";

export default function PopularCarousel({ movies = [], posterURL, onClickCard }) {
  if (!movies.length) return null;

  return (
    <div className="popular-carousel">
      <Swiper
        className="popular-carousel__swiper"
        spaceBetween={16}
        slidesPerView={"auto"}
        grabCursor={true}      // 마우스 오버 시 '손 모양' 커서 표시 : 드래그할 수 있다는 느낌을 줌
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="popular-carousel__slide"
          >
            <MovieCard
              title={movie.title}
              rating={movie.vote_average}
              posterUrl={
                movie.poster_path ? posterURL + movie.poster_path : ""
              }
              onClick={() => onClickCard(movie.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
