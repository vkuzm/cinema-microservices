const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true
    },
    movieId: {
      type: String,
      required: true
    },
    sessionDate: {
      type: String,
      required: true
    },
    sessionTime: {
      type: String,
      required: true
    },
    seats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }],
  },
  { collection: 'sessions' }
);

module.exports = mongoose.model('Session', SessionSchema);
