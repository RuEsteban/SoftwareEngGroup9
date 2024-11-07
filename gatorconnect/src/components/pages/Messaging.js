import React, { useState } from "react";
import "./Messaging.css";

const MessagingPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const users = ["Alice", "Bob", "Charlie"];

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, input.trim()]);
            setInput("");
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setMessages([]); // Reset messages for each user
    };

    return (
        <div className="messaging-page">
            <div className="user-list">
                <h3>Users</h3>
                {users.map((user) => (
                    <div
                        key={user}
                        className={`user-item ${selectedUser === user ? "active" : ""}`}
                        onClick={() => handleUserClick(user)}
                    >
                        {user}
                    </div>
                ))}
            </div>
            <div className="chat-container">
                <div className="message-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${index % 2 === 0 ? "sent" : "received"}`}
                        >
                            {msg}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        className="message-input"
                    />
                    <button onClick={handleSend} className="send-button">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagingPage;
