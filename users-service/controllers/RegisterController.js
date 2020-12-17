const bcrypt = require('bcrypt');
const Response = require('../models/Response');
const Constants = require('../Constants');
const MessageConstants = require('../MessageConstants');
const EmailValidator = require('../utils/EmailValidator');
const EmailPasswordEmpty = MessageConstants.EMAIL_PASSWORD_EMPTY;
const EmailInvalid = MessageConstants.EMAIL_INVALID;
const EmailAlreadyExists = MessageConstants.EMAIL_ALREADY_EXISTS;
const PasswordInvalid = MessageConstants.PASSWORD_INVALID;
const MongodbError = MessageConstants.MONGODB_ERROR;

const register = (userModel) => (req, res) => {
  handleSignUp(userModel, req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
};

const handleSignUp = async (userModel, data) => {
  if (!data.email || !data.password) {
    return Promise.reject(
      Response.error(EmailPasswordEmpty.code, EmailPasswordEmpty.message)
    );
  }
  if (!isEmailValid(data.email)) {
    return Promise.reject(
      Response.error(EmailInvalid.code, EmailInvalid.message)
    );
  }
  if (!isPasswordValid(data.password)) {
    return Promise.reject(
      Response.error(PasswordInvalid.code, PasswordInvalid.message)
    );
  }

  try {
    const hash = bcrypt.hashSync(data.password, Constants.PASSWORD_SALT);
    const newUser = {
      username: data.username,
      email: data.email,
      password: hash,
      name: data.name,
      age: data.age
    };
    const createdUser = await userModel.create(newUser);
    return Promise.resolve(createdUser);

  } catch (error) {
    if (error.message.includes('duplicate key')) {
      return Promise.reject(
        Response.error(EmailAlreadyExists.code, EmailAlreadyExists.message)
      );
    }
    return Promise.reject(
      Response.error(MongodbError.code, error.message)
    );
  }
};

const isEmailValid = (email) => {
  return EmailValidator.validate(email);
};

const isPasswordValid = (password) => {
  return (
    password.length >= Constants.PASSWORD_MIN_LENGTH &&
    password.length <= Constants.PASSWORD_MAX_LENGTH
  );
};

module.exports = {
  register
};
