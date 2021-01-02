import React from 'react';
import ApiUrls from '../../ApiUrls';
import MoviesList from '../../components/movie-list/movie-list.component';

class TopWatched extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topWatched: []
    };
  }

  componentDidMount() {
    fetch(ApiUrls.TOP_WATCHED)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ topWatched: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const topWatched = this.state.topWatched;
    return (
      <div className="wrapper page">
        <h1>Top watched</h1>
        <MoviesList movies={topWatched} />
      </div>
    );
  }
}

export default TopWatched;
