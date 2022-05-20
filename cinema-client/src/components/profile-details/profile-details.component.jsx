import FavoriteMovies from '../favorite-movies/favorite-movies.component';
import WithSpinner from '../with-spinner/with-spinner.component';

const FavoriteMoviesWithSpinner = WithSpinner(FavoriteMovies);

const ProfileDetails = ({ user, favorites }) => {
  return (
    <div className="wrapper page">
      <h1>User details</h1>
      <div>User Id: {user.userId}</div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>

      <br /><br />
      <FavoriteMoviesWithSpinner
        isLoading={favorites.length == 0}
        favorites={favorites}
      />
    </div>
  );
};

export default ProfileDetails;