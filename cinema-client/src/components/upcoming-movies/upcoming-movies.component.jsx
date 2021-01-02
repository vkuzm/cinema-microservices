import React from 'react';
import './upcoming-movies.styles.scss';

const UpcomingMovies = ({ movies }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie, movieIndex) => (
        <li key={movieIndex} className="movie-list-item">
          <a className="soon-page-movie" href={movie.url}>
            <div className="soon-page-movie-thumbnail">
              <div
                className="poster"
                style={{
                  backgroundImage: `url(${movie.image})`
                }}
              />
            </div>
            <h2>{movie.name}</h2>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UpcomingMovies;
