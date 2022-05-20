const redisService = require('../services/RedisService');
const redisClient = redisService.redisClient();
const Response = require('../models/Response');
const MessageConstants = require('../MessageConstants');
const userModel = require("../models/User");
const SessionRemoved = MessageConstants.AUTHORIZATION_SESSION_REMOVED;
const TokenInvalid = MessageConstants.AUTHORIZATION_TOKEN_INVALID;

const logOut = (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send(
      Response.add(TokenInvalid.code, TokenInvalid.message)
    );
  }

  return removeUserSession(authorization)
    .then(() => {
      return res.send(
        Response.add(SessionRemoved.code, SessionRemoved.message)
      );
    })
    .catch(() => {
      return res.status(401).send(
        Response.add(TokenInvalid.code, TokenInvalid.message)
      );
    });
};

const removeUserSession = (token) => {
  return new Promise((resolve, reject) => {
    redisClient.del(token, (err, res) => {
      if (err || !res) {
        return reject(err);
      }
      return resolve(res);
    });
  });
};

module.exports = {
  logOut
};
