import React, { useState, useEffect } from "react";
import MovieList from "./MovieList.jsx";
import searchMovieDB from "../searchMovieDB.js";
import initialMovieData from "../data/initialMovieData.js";

const App = (props) => {
  const [movies, setMovies] = useState(initialMovieData);
  const [textFilter, setTextFilter] = useState("");
  const [watchedFilter, setWatchedFilter] = useState(true);
  const [displayedMovies, setDisplayedMovies] = useState(movies);
  const [newMovieTitle, setNewMovieTitle] = useState("");

  const filterMovies = () => {
    setDisplayedMovies(
      movies.filter((movie) => {
        return (
          movie.title.toLowerCase().includes(textFilter) &&
          movie.watched === watchedFilter
        );
      })
    );
  };

  useEffect(() => {
    filterMovies();
  }, [movies, textFilter, watchedFilter]);

  return (
    <div className="main-container">
      <h2 id="title">MovieList</h2>
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
            // const newMovies = movies.concat({
            //   title: newMovie,
            //   watched: false,
            // });
            // setMovies(newMovies); // NOTE: After this line, movies hasn't got updated yet; Any state change --> triggers App rerender(new function call) --> update movies in new function call
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
