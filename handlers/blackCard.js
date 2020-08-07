const BlackCard = require("../models/BlackCard");

module.exports = {
  get: (req, res) => {
    res.json({
      question:
        "Instead of coal, Santa now gives the bad children __________________.",
    });
  },
  post: async (req, res) => {
    const { text, pickTwo } = req.body;

    try {
      const card = new BlackCard({
        text,
        pickTwo,
      });

      await card.save();

      res.send("done");
    } catch (err) {
      console.log(err);
      res.send('error')
    }
  },
};
