const keys = require("../keys");
const redisService = require("redis");

const redisClient = () => {
  return redisService.createClient(keys.redisURL);
};

module.exports = {
  redisClient,
};