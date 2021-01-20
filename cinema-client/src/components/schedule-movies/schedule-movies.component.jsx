import React from 'react';
import { Link } from 'react-router-dom';
import './schedule-movies.styles.scss';
import AppUrlConstants from '../../AppUrlConstants';

const ScheduleMovies = ({ movies, history }) => {
  const onShowSession = (sessionId) => {
    history.push(AppUrlConstants.getSessionUrl(sessionId));
  };

  return (
    <div className="schedule__films">
      {movies.map((movie, index) => (
        <div key={index} className="schedule__film">
          <Link to={AppUrlConstants.getMovieUrl(movie.movieId)}>
            <img className="schedule__film__poster" src={movie.image} alt={movie.name} />
            <p className="schedule__film__title">{movie.name}</p>
          </Link>
          <div className="schedule__film__sessions">
            {movie.sessions.map((session, sessionIndex) => (
              <div
                key={sessionIndex}
                className={session.available ? 'session' : 'session deact'}
                onClick={() => onShowSession(session.sessionId)}
              >
                {session.startTime}
                <p className="attr" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleMovies;
