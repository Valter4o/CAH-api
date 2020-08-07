const User = require("../models/User");
const { createToken } = require("../utils/jwt");

function errorSender(res, message, status = 400) {
  res.status(status).json({
    message,
  });
}

module.exports = {
  login: async (req, res) => {
    try {
      const { name, password } = req.body;

      const user = await User.findOne({
        $or: [{ email: name }, { username: name }],
      }).lean();

      if (!user) {
        return errorSender(res, "User not found");
      }

      const isValidPass = new User(user).passwordMatch(password);

      if (isValidPass) {
        const { password, ...rest } = user;
        const userInfo = Object.assign({}, { ...rest });

        const token = await createToken(userInfo);

        return res.json({
          message: "Login successful",
          token,
          userInfo,
        });
      } else {
        return errorSender(res, "Wrong pass");
      }
    } catch (err) {
      console.log(err);

      return errorSender(res, "Something went wrong");
    }
  },
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const newUser = new User({
        username,
        password,
        email,
      });

      const savedUser = await newUser.save();

      if (savedUser) {
        const { username, email } = savedUser;

        const token = createToken({ username, email });
        const userInfo = { username, email };

        res.json({
          message: "User created!",
          token,
          userInfo,
        });
      } else {
        errorSender(res, "There was problem creating your account");
      }
    } catch (err) {
      errorSender(res, "There was problem creating your account");
    }
  },
};
