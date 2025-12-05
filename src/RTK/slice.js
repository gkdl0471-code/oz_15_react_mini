import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./thunk";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popular: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "알 수 없는 에러";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      });
  },
});
