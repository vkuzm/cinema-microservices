import React from 'react';
import './schedule.styles.scss';
import ScheduleMovies from "../schedule-movies/schedule-movies.component";

const Schedule = () => {
  return (
    <div className="schedule">
      <div className="wrapper">
        <div className="schedule__heading">Sessions</div>
        <ul className="schedule__dates">
          <li className="selected">15 MARCH, MON</li>
          <li>16 MARCH, TUE</li>
          <li>17 MARCH, WED</li>
          <li>18 MARCH, THUR</li>
          <li>19 MARCH, FRY</li>
          <li>20 MARCH, SAT</li>
          <li>21 MARCH, SUN</li>
        </ul>
        <ScheduleMovies/>
      </div>
    </div>
  );
};

export default Schedule;