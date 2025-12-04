import movieDetailData from '../data/movieDetailData.json';
import './MovieDetail.scss'

export function MovieDetail({posterURL}) {
  const movie = movieDetailData;
  const movieDetailposterURL = posterURL + movie.backdrop_path;
  const rating = movie.vote_average.toFixed(1);
  const genresText = movie.genres.map((genre) => genre.name).join(' / ');

  return(
    <>
      <div className='container'>

          <img 
            className='poster-poster'
            src={movieDetailposterURL}
            alt={movie.title}
          />

        <div>
          <div className='title1'>
            <h1> {movie.title} </h1>
            <span>⭐ {rating}</span>
          </div>

          <div>
            <div className='font-black'>장르</div>
            <div>{genresText}</div>
          </div>

          <div>
            <div className='font-black'>줄거리</div>
            <div>{movie.overview}</div>
          </div>
        </div>

      </div>
    </>
  )
}