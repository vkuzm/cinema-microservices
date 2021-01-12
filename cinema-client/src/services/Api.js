import ApiUrls from '../ApiUrlConstants';

export const getMovie = async (movieId) => {
  return await fetch(`${ApiUrls.MOVIE} + "/" + movieId`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
