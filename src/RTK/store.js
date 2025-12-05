import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./slice";

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
  },
});
