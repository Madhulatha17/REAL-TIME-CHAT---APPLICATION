const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");
const socketHandler = require("./socket/socketHandler");

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json());

const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

socketHandler(io);

app.get("/", (req, res) => {
  res.send("Chat Server Running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
