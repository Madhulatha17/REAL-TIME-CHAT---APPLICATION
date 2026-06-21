const Message = require("../models/Message");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", async (data) => {
      const newMessage = new Message(data);
      await newMessage.save();

      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
