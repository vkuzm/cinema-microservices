import React, { useState, useEffect } from 'react';
import './favorite-button.styles.scss';
import FontAwesome from 'react-fontawesome';
import { getAuthToken } from '../../services/Auth';
import Api from '../../services/Api';

const FavoriteButton = ({ movieId, user }) => {
  const [favorite, setFavorite] = useState(false);
  const token = getAuthToken();

  const onFavoriteChange = (movieId) => {
    if (movieId) {
      Api.toggleFavorite(user.userId, movieId)
        .then((data) => {
          setFavorite(data.status);
        });
    }
  }

  useEffect(() => {
    Api.isFavorite(user.userId, movieId)
      .then((data) => {
        setFavorite(data.status);
      });
  }, [user, movieId]);

  return (
    <div
      className={`favorite ${favorite ? 'active' : ''}`}
      onClick={() => onFavoriteChange(movieId)}
    >
      <FontAwesome
        className="fas"
        name="heart"
        title="Add to your favorite list to watch it later"
      />
    </div>
  );
}

export default React.memo(FavoriteButton);