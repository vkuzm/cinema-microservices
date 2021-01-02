import React from 'react';
import './movies-list.styles.scss';

const MoviesList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, movieIndex) => (
        <div key={movieIndex} className="movie-list-item">
          <a className="movie-item" href={movie.url}>
            <div className="movie-item-thumbnail">
              <div
                className="poster"
                style={{
                  backgroundImage: `url(${movie.image})`
                }}
              />
            </div>
            <h2>{movie.title}</h2>
          </a>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
