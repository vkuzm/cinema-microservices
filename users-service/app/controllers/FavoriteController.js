const fetch = require('node-fetch');
const favoriteModel = require("../models/Favorite");
const apiUrl = require("../ApiUrlConstants");

const favoriteChange = async (req, res) => {
  const { userId, movieId } = req.body;

  return favoriteModel.exists({ userId, movieId })
    .then(async (status) => {
      if (status) {
        return favoriteModel.deleteOne({ userId, movieId })
          .then(() => res.send({ status: false }));

      } else {
        return favoriteModel.create({ userId, movieId })
          .then(() => res.send({ status: true }));
      }
    });
};

const favoriteStatus = async (req, res) => {
  const { userId, movieId } = req.params;

  const status = await favoriteModel.exists({ userId, movieId });
  return res.send({ status: status });
};

const getFavorites = async (req, res) => {
  const { userId } = req.params;

  const favorites = await favoriteModel.find({ userId }).select(['userId', 'movieId']);

  const favoriteMovies = await Promise.all(favorites.map(async (favorite) => {
    const response = await fetch(`${apiUrl.MOVIES}/${favorite.movieId}`);
    return response.json();
  }));
  
  return res.send(favoriteMovies);
};

module.exports = {
  favoriteChange,
  favoriteStatus,
  getFavorites
};
