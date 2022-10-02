import React, { useEffect, useState } from 'react';
import ApiUrls from '../../ApiUrlConstants';
import MovieDetails from '../../components/movie-details/movie-details.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import './movie.styles.scss';

const MovieDetailsWithSpinner = WithSpinner(MovieDetails);

const Movie = (props) => {
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const movieId = Number.parseInt(props.match.params.movieId);

    if (movieId && movieId > 0) {
      fetch(`${ApiUrls.MOVIES}/${movieId}`)
        .then((res) => res.json())
        .then((data) => {
          setMovieData(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <MovieDetailsWithSpinner
        isLoading={!movieData.name}
        info={movieData}
        schedule={movieData.schedule}
        recommendations={movieData.recommendations}
        {...props}
      />
    </div>
  );
}

export default React.memo(Movie, (prevProps, currProps) => prevProps.user === currProps.user);
