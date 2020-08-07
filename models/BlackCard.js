const { Schema, model: Model } = require("mongoose");
const { String, Boolean } = Schema.Types;
const random = require("mongoose-random");

const blackCardSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
  pickTwo: {
    type: Boolean,
    required: true,
  },
});
blackCardSchema.plugin(random, { path: "r" });

module.exports = new Model("BlackCard", blackCardSchema);
