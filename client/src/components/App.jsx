import React, { useState, useEffect } from "react";
import MovieList from "./MovieList.jsx";
import searchMovieDB from "../searchMovieDB.js";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const [watchedFilter, setWatchedFilter] = useState(true);
  const [displayedMovies, setDisplayedMovies] = useState(movies);
  const [newMovieTitle, setNewMovieTitle] = useState("");

  // TODO: filter and search should be done at server side!!!!!
  const listMovies = () => {
    setDisplayedMovies(
      movies.filter((movie) => {
        return (
          movie.title.toLowerCase().includes(textFilter) &&
          movie.watched === watchedFilter
        );
      })
    );
  };

  const fetchMovies = () => {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then((data) => {
        const fetchedMovies = data;
        setMovies(fetchedMovies);
        setDisplayedMovies(fetchedMovies);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle filter change only
  useEffect(() => {
    listMovies();
  }, [movies, textFilter, watchedFilter]);

  return (
    <div className="main-container">
      <h2 id="movie-list-title">MovieList</h2>
      <div className="add-bar">
        <input
          type="text"
          placeholder="Add movie title here..."
          value={newMovieTitle}
          onChange={(event) => {
            setNewMovieTitle(event.target.value);
          }}
        ></input>
        <button
          className="add-movie-btn"
          onClick={(event) => {
            event.preventDefault();
            searchMovieDB(newMovieTitle, (newMovie) => {
              setMovies([...movies, newMovie]);
            });
            setTextFilter("");
          }}
        >
          Add
        </button>
      </div>
      <MovieList
        movies={movies}
        displayedMovies={displayedMovies}
        setWatchedFilter={setWatchedFilter}
        setTextFilter={setTextFilter}
        setMovies={setMovies}
      ></MovieList>
    </div>
  );
};

export default App;
