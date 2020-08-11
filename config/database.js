const mongoose = require("mongoose");
const dbString = require("./config").dbUrl;
const rdyString = `${"*".repeat(10)}Database is Ready${"*".repeat(10)}`;

module.exports = () => {
  return mongoose.connect(
    dbString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) console.log(err);
      else console.log(rdyString);
    }
  );
};
