import React from 'react';
import { Link } from 'react-router-dom';
import './upcoming-movies.styles.scss';
import AppUrls from '../../AppUrlContants';

const UpcomingMovies = ({ movies }) => {
  return (
    <ul className="movie-list">
      {movies.map((movie, movieIndex) => (
        <li key={movieIndex} className="movie-list-item">
          <Link to={AppUrls.getMovieUrl(movie.movieId)} className="soon-page-movie">
            <div className="soon-page-movie-thumbnail">
              <div className="poster" style={{ backgroundImage: `url(${movie.image})` }} />
            </div>
            <h2>{movie.name}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UpcomingMovies;
