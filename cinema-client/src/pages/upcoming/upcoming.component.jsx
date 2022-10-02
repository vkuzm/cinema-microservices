import React, { useState, useEffect } from 'react';
import './upcoming.styles.scss';
import UpcomingMovies from '../../components/upcoming-movies/upcoming-movies.component';
import ApiUrls from '../../ApiUrlConstants';
import WithSpinnerWrapper from '../../components/with-spinner/with-spinner-wrapper.component';

const Upcoming = () => {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    fetch(ApiUrls.UPCOMING)
      .then((res) => res.json())
      .then((data) => {
        setUpcoming(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <WithSpinnerWrapper isLoading={upcoming.length === 0}>
      <div className="wrapper page">
        <h1>Upcoming</h1>
        <ul className="soon-page-list">
          {upcoming.map((day, index) => (
            <li key={index} className="soon-page-list-item">
              <div className="soon-page-movie-group">
                <div className="date-heading">
                  <span className="date">{day.day}</span>
                  <span className="weekday">{day.weekday}</span>
                </div>
                <UpcomingMovies movies={day.movies} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </WithSpinnerWrapper>
  );
}

export default Upcoming;
