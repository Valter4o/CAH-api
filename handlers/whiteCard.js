const getRandomCards = require("./helpers/getRandomCards");
const trimText = require("./helpers/trimText");

module.exports = {
  get: async (req, res) => {
    let arr = await getRandomCards(10, "white");

    const top = trimText(arr.slice(0, 5));
    const bottom = trimText(arr.slice(5));

    res.json({
      top,
      bottom,
    });
  },
  post: async (req, res) => {
    const { text } = req.body;
    if (text) {
      try {
        const newCard = new WhiteCard({ text });

        await newCard.save();

        res.send("done");
      } catch (err) {
        console.log(err);
        res.send("error");
      }
    }
  },
};
