const { Schema, model: Model } = require("mongoose");
const { String, ObjectId } = Schema.Types;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userScore: {
    type: ObjectId,
    ref: "Score",
  },
});

userSchema.methods = {
  passwordMatch(password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  }
});

module.exports = new Model("User", userSchema);
