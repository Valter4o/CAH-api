const WhiteCard = require("../models/WhiteCard");

module.exports = {
  get: async (req, res) => {
    let arr = await WhiteCard.findRandom(
      {},
      {},
      { limit: 69, skip: Math.random() * 69 }
    ).exec(function (err, cards) {
      console.log(cards);

      return cards;
    });

    res.json({
      top: [
        "Illegal immigrants",
        "Murder",
        "Invading Poland",
        "Nazis",
        "Bees?",
      ],
      bottom: [
        "An unwanted pregnancy",
        "Nicolas Cage",
        "Italians",
        "Stalin",
        "Dick fingers",
      ],
    });
  },
  post: async (req, res) => {
    const { text } = req.body;
    try {
      const newCard = new WhiteCard({ text });

      await newCard.save();

      res.send("done");
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  },
};
