const redisService = require('./RedisService');
const redisClient = redisService.redisClient();
const Response = require('../models/Response');
const MessageConstants = require('../MessageConstants');
const TokenInvalid = MessageConstants.AUTHORIZATION_TOKEN_INVALID;

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send(
      Response.add(TokenInvalid.code, TokenInvalid.message)
    );
  }

  return handleAuthorization(authorization)
    .then(() => {
      return next();
    })
    .catch(() => {
      return res.status(401).send(
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
  requireAuth
};
