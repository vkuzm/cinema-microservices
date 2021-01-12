import React from 'react';
import './upcoming.styles.scss';
import UpcomingMovies from '../../components/upcoming-movies/upcoming-movies.component';
import ApiUrls from '../../ApiUrlConstants';

class Upcoming extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upcoming: []
    };
  }

  componentDidMount() {
    fetch(ApiUrls.UPCOMING)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ upcoming: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="wrapper page">
        <h1>Upcoming</h1>
        <ul className="soon-page-list">
          {this.state.upcoming.map((day, index) => (
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
    );
  }
}

export default Upcoming;
