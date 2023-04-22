const Movie = require("../db").Movie;
const exampleMovieData = require("../server/exampleMovieData").exampleMovieData;

// To add above model to database
Movie.sync()
  .then(() => Movie.create(exampleMovieData[0]))
  .then(() => Movie.create(exampleMovieData[1]))
  .then(() => Movie.findAll())
  .then((movies) => {
    movies.forEach((movie) => {
      console.log(movie.title, "exists");
    });
  })
  .catch((err) => {
    console.error(err);
  });
