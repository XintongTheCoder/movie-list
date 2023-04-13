import { API_KEY } from "./config/config.js";
import * as $ from "jquery";

const ENDPOINT = "https://api.themoviedb.org/3/search/movie?api_key=";
const POSTER_PREFIX = "https://image.tmdb.org/t/p/original";

// $.ajaxPrefilter(function (settings, _, jqXHR) {
//   jqXHR.setRequestHeader("Authorization", API_KEY);
// });

var searchMovieDB = (query, callback) => {
  $.ajax({
    url: `${ENDPOINT}${API_KEY}&query=${query}`,
    type: "GET",
    contentType: "application/json",
    success: (data) => {
      const movies = data.results;
      // In case of multiple movies, get the movie with highest popularity
      const topMovie = movies.reduce((accum, movie) => {
        if (movie.popularity > accum.popularity) {
          accum = movie;
        }
        return accum;
      });

      callback({
        title: topMovie.title,
        original_language: topMovie.original_language,
        year: topMovie.release_date.substring(0, 4),
        vote: topMovie.vote_average,
        watched: false,
        overview: topMovie.overview,
        poster: POSTER_PREFIX + topMovie.poster_path,
      });
    },
    error: function (error) {
      console.error("themoviedb: Failed to fetch messages", error);
    },
  });
};

export default searchMovieDB;
