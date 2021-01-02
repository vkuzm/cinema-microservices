import React from 'react';
import './home.styles.scss';
import TopWatchedCarousel from '../../components/top-watched-carousel/top-watched-carousel.component';
import Schedule from '../../components/schedule/schedule.component';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <TopWatchedCarousel />
        <Schedule />
      </div>
    );
  }
}

export default Home;
