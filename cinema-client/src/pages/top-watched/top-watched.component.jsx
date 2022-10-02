import React, { useState, useEffect } from 'react';
import ApiUrls from '../../ApiUrlConstants';
import MoviesList from '../../components/movie-list/movie-list.component';
import WithSpinnerWrapper from '../../components/with-spinner/with-spinner-wrapper.component';

const TopWatched = () => {
  const [topWatched, setTopWatched] = useState([]);

  useEffect(() => {
    fetch(ApiUrls.TOP_WATCHED)
      .then((res) => res.json())
      .then((data) => {
        setTopWatched(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <WithSpinnerWrapper isLoading={topWatched.length === 0}>
      <div className="wrapper page">
        <h1>Top watched</h1>
        <MoviesList movies={topWatched} />
      </div>
    </WithSpinnerWrapper>
  );
}

export default TopWatched;
