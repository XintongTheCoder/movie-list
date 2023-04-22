const Sequelize = require("sequelize");
const db = new Sequelize("movie_db", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const Movie = db.define("Movie", {
  title: Sequelize.STRING,
  original_language: Sequelize.STRING,
  year: Sequelize.INTEGER,
  vote: Sequelize.DOUBLE(4, 3),
  watched: Sequelize.BOOLEAN,
  overview: Sequelize.TEXT("long"),
  poster: Sequelize.STRING,
});

exports.Movie = Movie;
