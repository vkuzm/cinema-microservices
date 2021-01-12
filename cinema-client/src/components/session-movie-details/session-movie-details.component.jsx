import React from 'react';
import './session-movie-details.styles.scss';
import FontAwesome from 'react-fontawesome';

const SessionMovieDetails = ({ movieName, movieImage, sessionDate, sessionTime }) => {
  return (
    <div className="movie-info">
      <div className="movie-media">
        <div className="movie-poster">
          <img src={movieImage} alt={movieName} />
        </div>

        <div className="media-body">
          <ul className="showtime-info">
            <li>
              <h1 className="movie-name">{movieName}</h1>
            </li>
            <li>
              <div className="date-day">
                <FontAwesome className="fas" name="calendar" /> {sessionDate}
              </div>
            </li>
            <li>
              <div className="film-time">
                <FontAwesome className="fas" name="clock-o" /> {sessionTime}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SessionMovieDetails;
