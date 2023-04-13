import React from "react";

const MovieInfo = ({ selectedMovie }) => {
  return (
    <div className="movie-info-container">
      <div className="movie-info">
        <div>
          Original_language: {selectedMovie.original_language.toUpperCase()}
        </div>
        <div>Year: {selectedMovie.year}</div>
        <div>Vote: {selectedMovie.vote}</div>
        <div>Overview: {selectedMovie.overview}</div>
      </div>
      <div className="movie-poster-container">
        <img className="movie-poster" src={selectedMovie.poster}></img>
      </div>
    </div>
  );
};

export default MovieInfo;
