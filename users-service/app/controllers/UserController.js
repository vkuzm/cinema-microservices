const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDto = require('../dto/UserDto');
const Constants = require('../Constants');
const Response = require('../models/Response');
const MessageConstants = require('../MessageConstants');
const EmailValidator = require('../utils/EmailValidator');
const userModel = require("../models/User");
const EmailInvalid = MessageConstants.EMAIL_INVALID;
const EmailAlreadyExists = MessageConstants.EMAIL_ALREADY_EXISTS;
const PasswordInvalid = MessageConstants.PASSWORD_INVALID;
const NameEmpty = MessageConstants.NAME_EMPTY;
const PasswordsNotMatched = MessageConstants.PASSWORDS_NOT_MATCHED;
const UserUpdatingSuccess = MessageConstants.USER_UPDATING_SUCCESS;
const UserUpdatingFailure = MessageConstants.USER_UPDATING_FAILURE;
const NoUserJWTFound = MessageConstants.NO_USER_JWT_FOUND;

const getUsers = async (req, res) => {
  const users = await userModel.find().lean();

  if (users && users.length) {
    const usersDto = users.map((user => convertToDto(user)));
    return res.send(usersDto);
  }
  return res.send({});
};

const getUser = async (req, res) => {
  const userId = req.params['userId'];

  if (isNumeric(userId)) {
    const user = await userModel.findOne({ userId: userId }).lean();
    if (user) {
      return res.send(convertToDto(user));
    } else {
      return res.send({});
    }
  }

  return res.send({});
};

const editUser = async (req, res) => {
  const token = req.headers['authorization'];
  const formData = req.body;

  handleUserEdit(formData, token)
    .then((result) => {
      return res.send(result);
    })
    .catch((error) => {
      return res.send(error);
    });
};

const handleUserEdit = async (data, token) => {
  const errors = await validate(data);
  if (errors.length) {
    return Promise.reject({ errors: errors });
  }

  const tokenData = getUserFromJWT(token);
  if (tokenData && tokenData.userId) {
    const filter = { userId: tokenData.userId };
    const update = {
      email: data.email,
      name: data.name,
      password: getHashedPassword(data.password),
      age: data.age
    };

    const updatedUser = await userModel.findOneAndUpdate(filter, update);
    if (updatedUser) {
      return Promise.resolve(
        Response.add(UserUpdatingSuccess.code, UserUpdatingSuccess.message)
      );
    } else {
      return Promise.reject(
        Response.add(UserUpdatingFailure.code, UserUpdatingFailure.message)
      );
    }

  } else {
    return Promise.reject(
      Response.add(NoUserJWTFound.code, NoUserJWTFound.message)
    );
  }
};

const validate = async (data) => {
  const errors = [];

  // #1 Check if email is empty or invalid
  if (!data.email || !isEmailValid(data.email)) {
    errors.push(EmailInvalid.message);
  }
  //#2 Check if passwords is empty or invalid
  if (!isPasswordValid(data.password) || !isPasswordValid(data.repassword)) {
    errors.push(PasswordInvalid.message);
  }
  //#3 Check if passwords not matched
  if (data.password !== data.repassword) {
    errors.push(PasswordsNotMatched.message);
  }
  //#4 Check if user name is empty
  if (!data.name) {
    errors.push(NameEmpty.message);
  }
  //#5 Check if email already exists
  if (await isEmailExisted(userModel, data.email)) {
    errors.push(EmailAlreadyExists.message);
  }
  return errors;
};

const getUserFromJWT = (token) => {
  return jwt.decode(token);
};

const getHashedPassword = (password) => {
  return bcrypt.hashSync(password, Constants.PASSWORD_SALT);
};

const isEmailValid = (email = '') => {
  return EmailValidator.validate(email);
};

const isPasswordValid = (password = '') => {
  return (
    password.length >= Constants.PASSWORD_MIN_LENGTH &&
    password.length <= Constants.PASSWORD_MAX_LENGTH
  );
};

const isEmailExisted = async (userModel, email) => {
  const user = await userModel.findOne({ email: email }).lean();
  return user !== null;
};

const convertToDto = (user) => {
  const userDto = new UserDto();
  userDto.userId = user.userId;
  userDto.name = user.name;
  userDto.email = user.email;
  userDto.age = user.age;
  userDto.joined = user.joined;
  return userDto;
}

const isNumeric = (num) => !isNaN(num);

module.exports = {
  getUsers,
  getUser,
  editUser
};
