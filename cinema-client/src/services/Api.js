import ApiUrls from '../ApiUrlConstants';
import { getAuthToken } from '../services/Auth';

const getMovie = async (movieId) => {
  return await fetch(`${ApiUrls.MOVIE}/${movieId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

const isFavorite = async (userId, movieId) => {
  return await fetch(`${ApiUrls.FAVORITES_STATUS}/userId/${userId}/movieId/${movieId}`, {
    method: 'GET',
    headers: headers
  })
    .then((res) => res.json());
};

const getFavorites = async (userId) => {
  return await fetch(`${ApiUrls.FAVORITES}/userId/${userId}`, {
    method: 'GET',
    headers: headers
  })
    .then((res) => res.json());
};

const toggleFavorite = async (userId, movieId) => {
  return await fetch(ApiUrls.FAVORITES_CHANGE, {
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      movieId: movieId
    }),
    headers: headers
  })
    .then((res) => res.json());
};

const headers = {
  'Content-Type': 'application/json',
  'Authorization': getAuthToken(),
};

export default {
  getMovie,
  isFavorite,
  getFavorites,
  toggleFavorite
}