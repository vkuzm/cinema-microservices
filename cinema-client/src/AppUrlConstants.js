const getMovieUrl = (movieId) => {
  return `/movie/${movieId}`;
};

const getSessionUrl = (sessionId) => {
  return `/session/${sessionId}`;
};

export default Object.freeze({
  getMovieUrl,
  getSessionUrl
});
