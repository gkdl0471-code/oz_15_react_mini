import { createSelector } from "@reduxjs/toolkit";

export const selectPopularMovies = (state) => state.movie.popular;
export const selectMovieLoading = (state) => state.movie.loading;
export const selectMovieError = (state) => state.movie.error;
export const selectMovieById = (movieId) =>
  createSelector(
    (state) => state.movie.popular,
    (movies) => movies.find((m) => m.id === movieId)
  );
export const selectMoviesByRegExp = (reg) =>
  createSelector(
    (state) => state.movie.popular,
    (movies) => {
      if (!reg) return [];
      return movies.filter(m => m && m.title && m.title.match(reg));
    }
  );