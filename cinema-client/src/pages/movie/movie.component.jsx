import React from 'react';
import './movie.styles.scss';
import ApiUrls from '../../ApiUrlConstants';
import MovieDetails from '../../components/movie-details/movie-details.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const MovieDetailsWithSpinner = WithSpinner(MovieDetails);

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      movieData: {}
    };
  }

  componentDidMount() {
    fetch(ApiUrls.MOVIE)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ movieData: data }, () => {
          this.setState({ isLoading: false });
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const info = this.state.movieData;
    const { schedule, recommendations } = info;

    return (
      <MovieDetailsWithSpinner
        isLoading={this.state.isLoading}
        info={info}
        schedule={schedule}
        recommendations={recommendations}
        {...this.props}
      />
    );
  }
}

export default Movie;
