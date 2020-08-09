module.exports = function trimText(arr) {
  return arr.map(({ text, _id }) => {
    return { id: _id, text: text.trim() };
  });
};
