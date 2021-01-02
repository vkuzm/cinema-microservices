import React from 'react';
import './schedule-movies.styles.scss';

const ScheduleMovies = ({ movies }) => {
  return (
    <div className="schedule__films">
      {movies.map((movie, index) => (
        <div key={index} className="schedule__film">
          <a href={movie.url}>
            <div className="age_restriction">{movie.restriction}</div>
            <img className="schedule__film__poster" src={movie.image} alt={movie.name} />
            <p className="schedule__film__title">{movie.name}</p>
          </a>
          <div className="schedule__film__sessions">
            {movie.sessions.map((session, sessionIndex) => (
              <div key={sessionIndex} className={session.available ? 'session' : 'session deact'}>
                {session.time}
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
