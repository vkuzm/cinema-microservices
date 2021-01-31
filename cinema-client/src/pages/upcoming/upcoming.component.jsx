import React from 'react';
import './upcoming.styles.scss';
import UpcomingMovies from '../../components/upcoming-movies/upcoming-movies.component';
import ApiUrls from '../../ApiUrlConstants';
import WithSpinnerWrapper from '../../components/with-spinner/with-spinner-wrapper.component';

class Upcoming extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      upcoming: []
    };
  }

  componentDidMount() {
    fetch(ApiUrls.UPCOMING)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ upcoming: data }, () => {
          this.setState({ isLoading: false });
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <WithSpinnerWrapper isLoading={this.state.isLoading}>
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
      </WithSpinnerWrapper>
    );
  }
}

export default Upcoming;
