
const ApiBaseUrl = 'http://localhost:8081';
const ApiUrlConstants = {
  SCHEDULE: '/json-placeholder/schedules.json', //SCHEDULE: 'http://localhost:8082/schedule',
  UPCOMING: '/json-placeholder/upcoming.json', //UPCOMING: 'http://localhost:8082/movies/upcoming',
  TOP_WATCHED: '/json-placeholder/top-watched.json', //TOP_WATCHED: 'http://localhost:8082/movies/top',
  TOP_WATCHED_CAROUSEL: '/json-placeholder/top-watched-carousel.json', //TOP_WATCHED_CAROUSEL: 'http://localhost:8082/movies/top-carousel'
  MOVIE: '/json-placeholder/movie.json',
  SESSION: '/json-placeholder/session.json',
  SIGN_IN: ApiBaseUrl + '/login',
  SIGN_UP: ApiBaseUrl + '/register',
  LOG_OUT: ApiBaseUrl + '/logout',
  AUTH: ApiBaseUrl + '/auth',
  PROFILE: ApiBaseUrl + '/',
  FAVORITES: ApiBaseUrl + '/favorites'
};  

export default Object.freeze(ApiUrlConstants);