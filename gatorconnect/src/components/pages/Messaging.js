import React, { useState } from "react";
import "./Messaging.css";
import {doc, setDoc, collection, addDoc, Timestamp} from 'firebase/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {db} from './Firebase'

const MessagingPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const users = ["Alice", "Bob", "Charlie"];


    
    const handleSend = async () => {
        if (input.trim()) {
            setMessages([input.trim()]);
            setInput("");
        }
        const auth = getAuth();
        const userDoc = doc(db, 'Messaging', auth.currentUser.uid);
        setDoc(userDoc, {merge: true});
        const userCollection = collection(userDoc, 'tempConvo');
        await setDoc(doc(userCollection, Timestamp.fromDate(new Date)), {
            reply: 'happy',
            apple: messages,
            date: Timestamp.fromDate(new Date),
        }
    )

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
