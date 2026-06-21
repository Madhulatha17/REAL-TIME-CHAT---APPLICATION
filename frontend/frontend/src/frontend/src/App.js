import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatBox from "./components/ChatBox";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div className="app">
      <h2>Real-Time Chat App 💬</h2>
      <ChatBox socket={socket} messages={messages} />
    </div>
  );
}

export default App;
