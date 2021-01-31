import React, { useEffect, useState } from 'react';
import './schedule-selector-movie.styles.scss';
import AppUrlConstants from '../../AppUrlConstants';

const ScheduleSelectorMovie = ({ schedule, history }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSessions, setSelectedSessions] = useState([]);

  const onSelectDay = (tabIndex) => {
    setSelectedDay(tabIndex);
  };

  useEffect(() => {
    if (schedule.length) {
      const sessions = schedule[selectedDay].sessions;
      setSelectedSessions(sessions);
    }
  }, [schedule, selectedDay]);

  const onShowSession = (sessionId) => {
    history.push(AppUrlConstants.getSessionUrl(sessionId));
  };

  return (
    <div className="schedule">
      <div className="wrapper">
        <h2 className="schedule__heading">Sessions</h2>
        {schedule.length ? (
          <ul className="schedule__dates">
            {schedule.map((item, tabIndex) => (
              <li
                key={tabIndex}
                className={`${selectedDay === tabIndex ? 'selected' : ''}`}
                onClick={() => onSelectDay(tabIndex)}
              >
                {item.day}
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no sessions</p>
        )}

        {selectedSessions.length ? (
          <div className="schedule__selections">
            <div className="schedule__selection">
              <p className="schedule__selection__name">Select time: </p>
              <div className="schedule__selection__sessions">
                {selectedSessions.map((session, index) => (
                  <div
                    onClick={() => onShowSession(session.sessionId)}
                    key={index}
                    className="session"
                  >
                    {session.startTime} <p className="attr" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>There are no sessions in the selected day</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleSelectorMovie;
