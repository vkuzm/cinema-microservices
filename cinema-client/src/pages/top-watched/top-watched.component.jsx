import React from 'react';
import ApiUrls from '../../ApiUrlConstants';
import MoviesList from '../../components/movie-list/movie-list.component';
import WithSpinnerWrapper from '../../components/with-spinner/with-spinner-wrapper.component';

class TopWatched extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      topWatched: []
    };
  }

  componentDidMount() {
    fetch(ApiUrls.TOP_WATCHED)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ topWatched: data }, () => {
          this.setState({ isLoading: false });
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <WithSpinnerWrapper isLoading={this.state.isLoading}>
        <div className="wrapper page">
          <h1>Top watched</h1>
          <MoviesList movies={this.state.topWatched} />
        </div>
      </WithSpinnerWrapper>
    );
  }
}

export default TopWatched;
