import { createAsyncThunk } from "@reduxjs/toolkit";

const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const fetchPopularMovies = createAsyncThunk("movie/fetchPopularMovies",
  async (maxPage = 1) => {
    const pageArray = Array.from({ length: maxPage }, (_, i) => i + 1);
    const fetchPage = async (page) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          `TMDB 인기 영화 요청 실패 (page: ${page}, status: ${res.status})`
        );
      }

      const data = await res.json();
      const filtered = (data.results || []).filter(movie => movie && movie.adult === false);

      return filtered;
    };

    const moviesByPage = await Promise.all(pageArray.map(fetchPage));
    const merged = moviesByPage.flat();

    return merged;
  }
);
