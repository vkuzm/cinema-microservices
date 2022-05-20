const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoriteSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true
    },
    movieId: {
      type: Number,
      required: true
    }
  },
  { collection: 'favorites' }
);

module.exports = mongoose.model('Favorite', FavoriteSchema);
