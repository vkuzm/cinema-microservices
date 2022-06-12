const sessionModel = require("../models/Session");
const seatModel = require("../models/Seat");

const getSessions = async (req, res) => {
  sessionModel.find().populate('seats').lean()
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

const getSessionById = async (req, res) => {
  const { sessionId } = req.params;

  return sessionModel.findOne({"sessionId": sessionId}).lean()
    .then((session) => {
      if (session) {
        return res.json(session);
      } else {
        res.status(400).json("No session found");
      }
    })
    .catch(() => {
      res.status(400).json("Unable to get session");
    });
};

const addSession = async (req, res) => {
  const { sessionId, movieId, sessionDate, sessionTime } = req.body;

  const isSessionExisted = await sessionModel.exists({ sessionId });
  if (isSessionExisted) {
    return res.status(200).json(`Session Id: ${sessionId} already exists`);
  }

  return sessionModel.create({ sessionId, movieId, sessionDate, sessionTime })
    .then((session) => addSeats(session))
    .then(() => res.status(201).send());
};

const removeSession = async (req, res) => {
  const { sessionId } = req.params;

  const isSessionExisted = await sessionModel.exists({ sessionId });
  if (isSessionExisted) {
    return sessionModel.deleteOne({sessionId})
      .then(() => res.status(200).send());
  }

  return res.status(404).send();
};

const addSeats = (session) => {
  const seats = [];

  fillSeats(seats, session, 20, 'front', 50);
  fillSeats(seats, session, 50, 'regular', 30);
  fillSeats(seats, session, 10, 'vip', 100);

  return seatModel.insertMany(seats);
}

const fillSeats = (seats, session, limit, type, price) => {
  for (let number = 1; number <= limit; number++) {
    const seat = {
      seatNumber: number,
      type: type,
      price: price,
      sessionId: session.sessionId,
      reserved: false
    }

    seats.push(seat);
  }
}

module.exports = {
  getSessions,
  getSessionById,
  addSession,
  removeSession
};
