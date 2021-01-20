const bcrypt = require('bcrypt');
const Response = require('../models/Response');
const Constants = require('../Constants');
const MessageConstants = require('../MessageConstants');
const EmailValidator = require('../utils/EmailValidator');
const EmailInvalid = MessageConstants.EMAIL_INVALID;
const EmailAlreadyExists = MessageConstants.EMAIL_ALREADY_EXISTS;
const PasswordInvalid = MessageConstants.PASSWORD_INVALID;
const PasswordsNotMatched = MessageConstants.PASSWORDS_NOT_MATCHED;
const NameInvalid = MessageConstants.NAME_INVALID;
const AgeInvalid = MessageConstants.AGE_INVALID;
const MongodbError = MessageConstants.MONGODB_ERROR;

const register = (userModel) => (req, res) => {
  handleSignUp(userModel, req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((errors) => {
      res.status(200).send({ errors });
    });
};

const handleSignUp = async (userModel, data) => {
  const errors = [];

  if (!isNameValid(data.name)) {
    errors.push(
      Response.add(NameInvalid.code, NameInvalid.message)
    );
  }
  if (!isAgeValid(data.age)) {
    errors.push(
      Response.add(AgeInvalid.code, AgeInvalid.message)
    );
  }
  if (!isEmailValid(data.email)) {
    errors.push(
      Response.add(EmailInvalid.code, EmailInvalid.message)
    );
  }
  if (!isPasswordValid(data.password)) {
    errors.push(
        Response.add(PasswordInvalid.code, PasswordInvalid.message
      )
    );
  }
  if (!isPasswordsMatched(data.password, data.repassword)) {
    errors.push(
      Response.add(PasswordsNotMatched.code, PasswordsNotMatched.message)
    );
  }

  if (errors.length) {
    return Promise.reject(errors);
  }

  try {
    const hashedPassword = bcrypt.hashSync(data.password, Constants.PASSWORD_SALT);
    const newUser = {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      name: data.name,
      age: data.age
    };
    const createdUser = await userModel.create(newUser);
    return Promise.resolve(createdUser);
  } catch (error) {
    if (error.message.includes('duplicate key')) {
      return Promise.reject([
        Response.add(EmailAlreadyExists.code, EmailAlreadyExists.message)
      ]);
    }
    return Promise.reject([
      Response.add(MongodbError.code, error.message)
    ]);
  }
};

const isNameValid = (name) => {
  return name.length >= Constants.NAME_MIN_LENGTH 
  && name.length <= Constants.NAME_MAX_LENGTH;
};

const isAgeValid = (age) => {
  if (age && age.length) {
    return Number.isInteger(Number.parseInt(age));
  }
  return true;
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

const isPasswordsMatched = (password, repassword) => {
  return password === repassword;
};

module.exports = {
  register
};
