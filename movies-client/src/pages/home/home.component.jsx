import React from 'react';
import './home.styles.scss';
import TopWatched from '../../components/top-watched/top-watched.component';
import Schedule from '../../components/schedule/schedule.component';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <TopWatched />
        <Schedule />
      </div>
    );
  }
}

export default Home;
