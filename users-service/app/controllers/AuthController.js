const redisService = require('../services/RedisService');
const redisClient = redisService.redisClient();
const Response = require('../models/Response');
const MessageConstants = require('../MessageConstants');
const userModel = require("../models/User");
const TokenInvalid = MessageConstants.AUTHORIZATION_TOKEN_INVALID;

const auth = (req, res) => {
  const { authorization } = req.headers;

  handleAuthorization(authorization)
  .then((userId) => {
    userModel.findOne({ userId: userId }).lean()
    .then((user) => {
      res.status(200).send({
        userId: user.userId,
        name: user.name,
        email: user.email
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
  })
  .catch(() => {
    res.status(401).send(
      Response.add(TokenInvalid.code, TokenInvalid.message)
    );
  });
};

const handleAuthorization = (token) => {
  return new Promise((resolve, reject) => {
    redisClient.get(token, (err, res) => {
      if (err || !res) {
        return reject(err);
      }
      return resolve(res);
    });
  });
};

module.exports = {
  auth
};
