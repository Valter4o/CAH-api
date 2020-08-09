const WhiteCard = require("../../models/WhiteCard");
const BlackCard = require("../../models/BlackCard");

module.exports = function getRandomCards(limit, type) {
  return new Promise((resolve, reject) => {
    const model = type === "white" ? WhiteCard : BlackCard;
    model.findRandom({}, {}, { limit: limit }).exec(function (err, cards) {
      if (err) reject(err);
      return resolve(cards);
    });
  });
};
