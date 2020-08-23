const WhiteCard = require("../../models/WhiteCard");
const BlackCard = require("../../models/BlackCard");

module.exports = function getRandomCards(
  limit,
  type,
  filter = {},
  fields = {}
) {
  return new Promise((resolve, reject) => {
    const model = type === "white" ? WhiteCard : BlackCard;
    model
      .findRandom(filter, fields, { limit: limit })
      .exec(function (err, cards) {
        if (err) reject(err);
        return resolve(cards);
      });
  });
};
