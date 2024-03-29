const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisService = require('../services/RedisService');
const redisClient = redisService.redisClient();
const Response = require('../models/Response');
const Constants = require('../Constants');
const MessageConstants = require('../MessageConstants');
const userModel = require("../models/User");
const EmailPasswordInvalid = MessageConstants.EMAIL_PASSWORD_INVALID;

const login = (req, res) => {
  const loginData = req.body;

  handleSignIn(loginData)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
};

const handleSignIn = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return emailPasswordInvalidError();
  }

  try {
    const user = await userModel.findOne({ email: email }).lean();
    const isValid = bcrypt.compareSync(password, user.password);

    if (isValid) {
      return saveToken(user.userId, user.email);
    } else {
      return emailPasswordInvalidError();
    }
  } catch (error) {
    console.error(error);
  }
};

const saveToken = (userId, email) => {
  const token = signToken(userId, email);

  return new Promise((resolve, reject) => {
    redisClient.set(token, userId, (err, res) => {
      if (err || !res) {
        return reject(err);
      }

      return resolve({
        userId: userId,
        token: token
      });
    });
  });
};

const signToken = (userId, email) => {
  const jwtPayload = { userId, email };
  return jwt.sign(jwtPayload, Constants.JWT_SECRET, { expiresIn: Constants.JWT_EXPIRES });
};

const emailPasswordInvalidError = () => {
  return Promise.reject(
    Response.add(EmailPasswordInvalid.code, EmailPasswordInvalid.message)
  );
};

module.exports = {
  login
};
