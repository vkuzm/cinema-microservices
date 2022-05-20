import { Link } from 'react-router-dom';
import AppUrls from '../../AppUrlConstants';

const FavoriteMovies = ({ favorites }) => {
  return (
    <div className="favorite-movies">
      <h1>Favorite movies</h1>
      
      <div className="movie-list">
        {favorites.map((favorite) => (
          <div key={favorite.movieId} className="movie-list-item">
            <Link to={AppUrls.getMovieUrl(favorite.movieId)} className="movie-item">
              <div className="movie-item-thumbnail">
                <div className="poster" style={{ backgroundImage: `url(${favorite.image})` }} />
              </div>
              <h2>{favorite.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;