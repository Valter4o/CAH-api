const { Schema, model: Model } = require("mongoose");
const { String } = Schema.Types;
const random = require("mongoose-random");

const whiteCardSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
});
whiteCardSchema.plugin(random, { path: "r" });

module.exports = new Model("WhiteCard", whiteCardSchema);
