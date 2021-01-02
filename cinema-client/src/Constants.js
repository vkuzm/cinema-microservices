const constants = {
  PASSWORD_SALT: 10,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 20,
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRES: '2 days',
};

module.exports = Object.freeze(constants);
