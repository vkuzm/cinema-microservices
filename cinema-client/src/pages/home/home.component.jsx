import React from 'react';
import Schedule from '../../components/schedule/schedule.component';
import TopWatchedCarousel from '../../components/top-watched-carousel/top-watched-carousel.component';
import './home.styles.scss';

const Home = (props) => {
  return (
    <div className="home">
      <TopWatchedCarousel />
      <Schedule {...props} />
    </div>
  );
}

export default Home;
