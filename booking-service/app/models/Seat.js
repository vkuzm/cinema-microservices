const mongoose = require('mongoose');
const { Schema } = mongoose;

const SeatSchema = new Schema(
  {
    seatNumber: {
      type: String,
      required: true,
      unique: false
    },
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    sessionId: {
      type: String,
      required: true
    },
    reserved: {
      type: Boolean,
      required: true
    }
  },
  { collection: 'seats' }
);

module.exports = mongoose.model('Seat', SeatSchema);
