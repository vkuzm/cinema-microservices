import React from 'react';
import { Link } from 'react-router-dom';
import './movies-list.styles.scss';
import AppUrls from '../../AppUrlConstants';

const MoviesList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, movieIndex) => (
        <div key={movieIndex} className="movie-list-item">
          <Link to={AppUrls.getMovieUrl(movie.movieId)} className="movie-item">
            <div className="movie-item-thumbnail">
              <div className="poster" style={{ backgroundImage: `url(${movie.image})` }} />
            </div>
            <h2>{movie.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
