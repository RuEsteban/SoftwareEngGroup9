import React, { useState } from "react";
import ReactDOM from "react-dom";

const DevMess = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Messaging UI</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ margin: "5px 0" }}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSendMessage} style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button type="submit" style={{ marginLeft: "5px", padding: "10px" }}>
          Send
        </button>
      </form>
    </div>
  );
};
export default DevMess;
ReactDOM.render(
  <React.StrictMode>
    <DevMess />
  </React.StrictMode>,
  document.getElementById("root")
);
