import React, { useState, useEffect } from 'react';
import './favorite-button.styles.scss';
import FontAwesome from 'react-fontawesome';
import { getAuthToken } from '../../services/Auth';
import ApiUrl from '../../ApiUrlConstants';

const FavoriteButton = ({ movieId, user }) => {
  const [favorite, setFavorite] = useState(false);
  const token = getAuthToken();

  const onFavoriteChange = (movieId) => {
    if (movieId) {
      fetch(ApiUrl.FAVORITES_CHANGE, {
        method: 'POST',
        body: JSON.stringify({
          userId: user.userId,
          movieId: movieId
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setFavorite(data.status);
        });
    }
  }

  useEffect(() => {
    fetch(ApiUrl.FAVORITES_STATUS, {
      method: 'POST',
      body: JSON.stringify({
        userId: user.userId,
        movieId: movieId
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorite(data.status);
      });
  });

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

export default FavoriteButton;