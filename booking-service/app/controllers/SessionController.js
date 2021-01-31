const Constants = require('../Constants');

const getSessions = (db) => async (req, res) => {
  db("sessions")
    .select("*")
    .then((sessions) => {
      if (sessions) {
        return res.json(sessions);
      } else {
        res.status(400).json("No session found");
      }
    })
    .catch(() => {
      res.status(400).json("Unable to get sessions");
    });
};

module.exports = {
  getSessions
};
