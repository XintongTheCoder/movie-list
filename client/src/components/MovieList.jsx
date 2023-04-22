import React, { useState, Fragment } from "react";
import MovieInfo from "./MovieInfo.jsx";

const MovieList = ({
  movies,
  displayedMovies,
  setWatchedFilter,
  setTextFilter,
  setMovies,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({ title: "" });

  return (
    <div className="movie-list-container">
      <div className="filter-container">
        <div className="watched-filter-btn">
          <button
            onClick={() => {
              setWatchedFilter(true);
            }}
          >
            Watched
          </button>
          <button
            onClick={() => {
              setWatchedFilter(false);
            }}
          >
            To Watch
          </button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          ></input>
          <button
            className="search-movie-btn"
            onClick={(event) => {
              event.preventDefault();
              setTextFilter(searchInput);
            }}
          >
            Go!
          </button>
        </div>
      </div>
      <div className="movie-list">
        <div>
          {displayedMovies.length > 0 ? (
            displayedMovies.map((movie, index) => (
              <Fragment key={movie.title}>
                <div className="movie-title-container">
                  <div
                    className="movie-title"
                    onClick={(event) => {
                      event.preventDefault();
                      const selectedMovieTitle = event.target.innerHTML;
                      // Toggle the display of current movie's info
                      if (
                        selectedMovie &&
                        selectedMovie.title === selectedMovieTitle
                      ) {
                        setSelectedMovie({});
                      } else {
                        const newSelectedMovie = movies.find((movie) => {
                          return movie.title === selectedMovieTitle;
                        });
                        setSelectedMovie(newSelectedMovie);
                      }
                    }}
                    style={{
                      backgroundColor:
                        movie.title === selectedMovie.title
                          ? "MediumSeaGreen"
                          : "",
                    }}
                  >
                    {movie.title}
                  </div>
                  <button
                    className="toggle-watched-btn"
                    onClick={() => {
                      const movieTitle = movie.title;
                      const newMovies = movies.map((movie) => {
                        if (movie.title === movieTitle) {
                          movie.watched = !movie.watched;
                        }
                        return movie;
                      });
                      console.log(newMovies);
                      setMovies(newMovies);
                    }}
                  >
                    {movie.watched ? "watched" : "to watch"}
                  </button>
                </div>
                {selectedMovie && selectedMovie.title === movie.title && (
                  <MovieInfo selectedMovie={selectedMovie}></MovieInfo>
                )}
              </Fragment>
            ))
          ) : (
            <div>Sorry, no movie by that name found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
