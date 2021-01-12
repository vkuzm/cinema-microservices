const getMovieUrl = (movieId) => {
  return `/movie/${movieId}`;
};

const getSessionUrl = (sessionId) => {
  return `/session/${sessionId}`;
};

const AppUrls = {
  getMovieUrl,
  getSessionUrl
};

module.exports = Object.freeze(AppUrls);
