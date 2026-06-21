import React, { useState } from "react";

function ChatBox({ socket, messages }) {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");

  const sendMessage = () => {
    if (text !== "") {
      const msgData = {
        sender: user,
        message: text
      };

      socket.emit("send_message", msgData);
      setText("");
    }
  };

  return (
    <div>
      <input
        placeholder="Enter name"
        onChange={(e) => setUser(e.target.value)}
      />

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}: </b> {msg.message}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatBox;
