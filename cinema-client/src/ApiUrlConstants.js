
const ApiBaseUrl = 'http://localhost:8080';
const ApiUrlConstants = {
  SCHEDULE: 'http://localhost:8082/schedule/', // ApiBaseUrl + '/schedule/',
  UPCOMING: 'http://localhost:8082/movies/upcoming/', // ApiBaseUrl + '/cinema/movies/upcoming/',
  TOP_WATCHED: 'http://localhost:8082/movies/top/', // ApiBaseUrl + '/cinema/movies/top/'
  TOP_WATCHED_CAROUSEL: 'http://localhost:8082/movies/top-carousel/', // ApiBaseUrl + '/cinema/movies/top-carousel/'
  MOVIES: 'http://localhost:8082/movies/', //ApiBaseUrl + '/cinema/movies/'
  SESSION: '/json-placeholder/session.json',
  USERS: ApiBaseUrl + '/users/',
  SIGN_IN: ApiBaseUrl + '/users/login/',
  SIGN_UP: ApiBaseUrl + '/users/register/',
  LOG_OUT: ApiBaseUrl + '/users/logout/',
  AUTH: ApiBaseUrl + '/users/auth/',  
  FAVORITES: ApiBaseUrl + '/favorites/'
};  

export default Object.freeze(ApiUrlConstants);