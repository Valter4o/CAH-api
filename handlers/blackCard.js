const getRandomCards = require("./helpers/getRandomCards");
const trimText = require("./helpers/trimText");

module.exports = {
  get: async (req, res) => {
    let question = await getRandomCards(1, "black");

    let { text, _id: id, pickTwo } = question[0];

    res.json({
      question: { text, id, pickTwo },
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
      res.send("error");
    }
  },
};
