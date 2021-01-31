import React from 'react';
import './schedule.styles.scss';
import ScheduleMovies from '../schedule-movies/schedule-movies.component';
import ApiUrls from '../../ApiUrlConstants';
import WithSpinner from '../with-spinner/with-spinner.component';
import WithSpinnerWrapper from '../with-spinner/with-spinner-wrapper.component';

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      schedule: [],
      shownMovies: [],
      selectedDay: 0
    };
  }

  componentDidMount() {
    fetch(ApiUrls.SCHEDULE)
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            schedule: data,
            shownMovies: data[0].movies
          },
          () => {
            this.setState({ isLoading: false });
          }
        );
      })
      .catch((err) => console.log(err));
  }

  onSelectDay(tabIndex) {
    this.setState({ selectedDay: tabIndex }, () => {
      const movies = this.state.schedule[tabIndex].movies;
      this.setState({ shownMovies: movies });
    });
  }

  render() {
    return (
      <WithSpinnerWrapper isLoading={this.state.isLoading}>
        <div className="schedule">
          <div className="wrapper">
            <div className="schedule__heading">Sessions</div>
            <ul className="schedule__dates">
              {this.state.schedule.map((item, tabIndex) => (
                <li
                  key={tabIndex}
                  className={`${this.state.selectedDay === tabIndex ? 'selected' : ''}`}
                  onClick={() => this.onSelectDay(tabIndex)}
                >
                  {item.day}
                </li>
              ))}
            </ul>
            <ScheduleMovies movies={this.state.shownMovies} {...this.props} />
          </div>
        </div>
      </WithSpinnerWrapper>
    );
  }
}

export default Schedule;
