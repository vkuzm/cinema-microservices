import React from 'react';
import './schedule.styles.scss';
import ScheduleMovies from '../schedule-movies/schedule-movies.component';
import ApiUrls from '../../ApiUrls';

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule: [],
      shownMovies: [],
      selectedDay: 0
    };
  }

  componentDidMount() {
    fetch(ApiUrls.SCHEDULE)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ schedule: data }, () => {
          this.setState({ shownMovies: data[0].movies });
        });
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
          <ScheduleMovies movies={this.state.shownMovies} />
        </div>
      </div>
    );
  }
}

export default Schedule;
