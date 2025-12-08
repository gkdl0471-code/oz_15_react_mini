import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomeCarousel.scss";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

export default function HomeCarousel({ movies = [], posterURL, onClickCard, title }) {
  const carouselMovies = movies.slice(0, 7);
  const [activeIndex, setActiveIndex] = useState(0);         // 현재 활성(가운데) 슬라이드의 인덱스를 상태로 관리(초기값 0)
  const activeMovie = carouselMovies[activeIndex] || null;   // activeIndex에 해당하는 영화 객체를 가져오고 없으면 null

  const backgroundImageUrl = useMemo(() => {                 // activeMovie나 posterURL이 바뀔 때만 배경 이미지 URL을 다시 계산
    if (!activeMovie) return "";                             // 영화 안뜨면 배경 안 뜸
    if (activeMovie.backdrop_path) {                         // backdrop_path가 있는 경우
      return BACKDROP_BASE_URL + activeMovie.backdrop_path;  // backdrop 기본 URL + 경로를 합쳐서 배경으로
    }
    if (activeMovie.poster_path) {                           // poster_path만 있는 경우
      return posterURL + activeMovie.poster_path;            // 포스터 base URL + 경로를 합쳐서 배경으로
    }
    return "";                                               // 둘 다 없으면 배경 이미지는 사용하지 않음
  }, [activeMovie, posterURL]);                              // 의존 배열: activeMovie 또는 posterURL이 바뀔 때만 다시 실행

  const getCardImageUrl = (movie) => {                       
    if (!movie) return "";                                   // 영화 객체가 없으면 빈 문자열 반환
    if (movie.backdrop_path) return BACKDROP_BASE_URL + movie.backdrop_path;       // backdrop이 있으면 그걸 우선 사용
    if (movie.poster_path) return posterURL + movie.poster_path;                   // 없으면 포스터 경로를 사용
    return "";                                                                     // 둘 다 없으면 이미지 없이 처리
  };

  const truncate = (text, max = 20) => {                          // 문자열을 max 길이까지만 자르고 뒤에 ...을 붙이는 헬퍼 함수
    if (!text) return "";                                         // 텍스트가 없으면 빈 문자열 반환
    return text.length > max ? text.slice(0, max) + "..." : text; // '길이가 max보다 크면' ? '앞에서 max글자까지만 자르고 "..." 추가' : '원본문자열 그대로 반환'
  };

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
          loop                                                // 무한 회전
          centeredSlides                                      // 슬라이드를 가운데 정렬
          slidesPerView={1.5}                                 // 0.5 / 1 / 0.5 느낌 (centeredSlides랑 같이 쓰면 양 옆은 살짝 미리보기'연출 가능)
          spaceBetween={24}                                   // 사이의 간격(px)
          autoplay={{                                         // 자동 재생(슬라이드가 알아서 넘어감)
            delay: 3000,
            disableOnInteraction: false,                      // 손대면 오토플레이 끌래? 놉
          }}
          pagination={{ clickable: true }}                    // 아래에 ●●● 점 생기는 페이지네이션 { 점 클릭해서 이동 가능 }
          navigation                                          // 좌우 화살표(<, >) 버튼
          onSwiper={(swiper) => {                             // 캐러셀이 처음 렌더될 때 → activeIndex 상태를 초기 슬라이드 인덱스로 설정하는 역할
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={(swiper) => {                        // 슬라이드가 바뀔 때마다 호출되는 콜백
            setActiveIndex(swiper.realIndex);
          }}
          breakpoints={{                                      // 화면 너비(픽셀)에 따라 옵션을 다르게 적용
            768: { slidesPerView: 1.7, spaceBetween: 28 },    // 768px 이상일 떄 (태블릿 이상)
            1024: { slidesPerView: 2, spaceBetween: 32 },     // 1024px 이상일 때 (데스크톱 이상)
          }}
        >
          {carouselMovies.map((movie, index) => { 
            if (!movie) return null;                          

            const imageUrl = getCardImageUrl(movie);
            const rating = movie.vote_average
              ? movie.vote_average.toFixed(1)
              : null;

            const isActive = index === activeIndex;            // 현재 순회 중인 인덱스가 활성 슬라이드 인덱스와 같은지 여부 판단(중앙 카드 여부)

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
