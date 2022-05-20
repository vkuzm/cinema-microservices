
const ApiBaseUrl = 'http://localhost:8080';
const ApiUrlConstants = {
  SCHEDULE: ApiBaseUrl + '/cinema/schedule',
  UPCOMING: ApiBaseUrl + '/cinema/movies/upcoming',
  TOP_WATCHED: ApiBaseUrl + '/cinema/movies/top',
  TOP_WATCHED_CAROUSEL: ApiBaseUrl + '/cinema/movies/top-carousel',
  MOVIES: ApiBaseUrl + '/cinema/movies',
  SESSION: '/json-placeholder/session.json',
  USERS: ApiBaseUrl + '/users',
  SIGN_IN: ApiBaseUrl + '/users/login',
  SIGN_UP: ApiBaseUrl + '/users/register',
  LOG_OUT: ApiBaseUrl + '/users/logout',
  AUTH: ApiBaseUrl + '/users/auth',  
  FAVORITES: ApiBaseUrl + '/users/favorites',
  FAVORITES_CHANGE: ApiBaseUrl + '/users/favorites/change',
  FAVORITES_STATUS: ApiBaseUrl + '/users/favorites/status'
};  

export default Object.freeze(ApiUrlConstants);