import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
 const API_KEY = "85c7b68d";

export const moviesApi = createApi({

  reducerPath: "moviesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com/",
  }),

  endpoints: (builder) => ({
    searchMovies: builder.query({
      query: (searchTerm: string) =>
        `?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`,
    }),
    getMovieById: builder.query({
      query: (id: string) =>
        `?apikey=${API_KEY}&i=${id}&plot=full`,
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieByIdQuery } = moviesApi;