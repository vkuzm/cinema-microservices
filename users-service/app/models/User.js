const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userId: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    age: Number,
    password: {
      type: String,
      required: true
    },
    joined: {
      type: Date,
      default: Date.now
    }
  },
  { collection: 'users' }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.plugin(autoIncrement, {inc_field: 'userId'});

module.exports = mongoose.model('User', UserSchema);
