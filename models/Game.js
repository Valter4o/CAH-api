const { Schema, model: Model } = require("mongoose");
const { String, Boolean, ObjectId, Object } = Schema.Types;

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
  },
  creator: {
    id: {
      type: ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  minPlayers: {
    type: String,
    required: true,
  },
  maxPlayers: {
    type: String,
    required: true,
  },
  deck: {
    type: String,
  },
  inProgress: {
    type: Boolean,
    required: true,
  },
  tsar: {
    type: String,
  },
});

module.exports = new Model("Game", gameSchema);
