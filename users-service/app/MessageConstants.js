const Constants = require('./Constants');

const messageConstants = {
  MONGODB_ERROR: {
    code: 'mongodb_error',
    message: 'Mongodb error has occurred'
  },
  EMAIL_PASSWORD_INVALID: {
    code: 'email_password_invalid',
    message: 'Email or password is invalid'
  },
  EMAIL_PASSWORD_EMPTY: {
    code: 'email_password_empty',
    message: 'Email or password is empty'
  },
  EMAIL_INVALID: {
    code: 'email_invalid',
    message: 'Email is invalid'
  },
  EMAIL_ALREADY_EXISTS: {
    code: 'email_already_exists',
    message: 'Email already exists'
  },
  PASSWORD_INVALID: {
    code: 'password_invalid',
    message: `Password should be between ${Constants.PASSWORD_MIN_LENGTH} - ${Constants.PASSWORD_MAX_LENGTH} characters`
  },
  PASSWORDS_NOT_MATCHED: {
    code: 'passwords_not_matched',
    message: 'Passwords not matched'
  },
  NAME_INVALID: {
    code: 'name_invalid',
    message: `Name should be between ${Constants.NAME_MIN_LENGTH} - ${Constants.NAME_MAX_LENGTH} characters`
  },
  AGE_INVALID: {
    code: 'age_invalid',
    message: 'Age must be a number'
  },
  LOGIN_ERROR: {
    code: 'login_error',
    message: ''
  },
  LOGIN_SUCCESS: {
    code: 'login_success',
    message: 'Login has been made successfully'
  },
  AUTHORIZATION_TOKEN_INVALID: {
    code: 'token_invalid',
    message: 'Authorization token is invalid'
  },
  AUTHORIZATION_SESSION_REMOVED: {
    code: 'session_removed',
    message: 'User session is removed'
  },
  USER_UPDATING_SUCCESS: {
    code: 'user_updating_success',
    message: 'User updated successfully'
  },
  USER_UPDATING_FAILURE: {
    code: 'user_updating_failure',
    message: 'User update has failed'
  },
  NO_USER_JWT_FOUND: {
    code: 'no_user_jwt_found',
    message: 'No user from JWT token was found'
  }
};

module.exports = Object.freeze(messageConstants);
