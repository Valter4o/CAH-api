module.exports = function emitToAll(receivers, messages) {
  receivers.forEach(({ socket }) => {
    messages.forEach(([eventName, data]) => {
      socket.emit(eventName, data);
    });
  });
};
