import React, { useState, useEffect } from "react";
import "./Messaging.css";
import {doc, setDoc, collection, getDoc, getDocs, Timestamp} from 'firebase/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {db} from './Firebase'

const MessagingPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [userMap, setuserMap] = useState({});

    useEffect(() => {
        const auth = getAuth();
        const userCollection = collection(db, 'Messaging');
        const fetchMessages = async () => {
            try {
                const querySnapshot = await getDocs(userCollection);
                const fetchedUsers = await Promise.all(
                    querySnapshot.docs
                    .filter((userDoc) => userDoc.id.includes(auth.currentUser.uid))
                    .map(async (userDoc) => {
                        
                        const userID = auth.currentUser.uid;
                        if(userDoc.id.includes(userID)){
                            console.log("entered?")
                            const docRef = doc(db, 'Messaging', userDoc.id);
                            const messageCollection = collection(docRef, 'Messages');
                            const temp = "IGNORE";
                            const combined = temp + auth.currentUser.uid;
                            const userDocRef = doc(messageCollection, combined);
                            const docSnap = await getDoc(userDocRef);
        
                            if (docSnap.exists()) {
                                const docNameData = docSnap.data();
                                console.log("Document data:", docNameData.name, userDoc.id);
                                return {name: docNameData.name, uid: userDoc.id}; // Collect the name
                            } 
                        }
                       
                    })
                );
               

                const userDict = {};
                fetchedUsers.forEach(({uid, name}) => {
                    
                    console.log(uid);
                    userDict[name] = uid;
                });
                setuserMap(userDict);
                setUsers(Object.keys(userDict));
            
               
            } catch (error) {
                console.error('Error fetching messages: ', error);
            }
        };
    
        fetchMessages();
    }, []);
    
    
    const handleSend = async () => {
        if (input.trim()) {
            setInput("");
        }
        console.log("Selected", userMap[selectedUser]);

        try {
            const auth = getAuth();
           
            const userDoc = doc(db, 'Messaging', userMap[selectedUser]);
 
            const userCollection = collection(userDoc, 'Messages');
            const now = new Date();
            const dateID = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
            await setDoc(doc(userCollection, dateID), {
                message: input.trim(),
                user: auth.currentUser.uid,
            })
            updateMessageUI(selectedUser);
        }catch (error) {
            console.log(error);
        }
       
    

    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleUserClick = async (user) => {
        setSelectedUser(user);
        updateMessageUI(user);
       
    };
    
    const updateMessageUI = async (user) => {
        const auth = getAuth();
        setMessages([]);
        try {
            
            const currentUser = collection(db, 'Messaging', userMap[user], 'Messages');
            const messageArray = await getDocs(currentUser);
            messageArray.forEach(async (userDoc) => {
                if(!userDoc.id.includes("IGNORE")){
                    const messageData = userDoc.data();
                    const sender = messageData.user;
                    if(sender === auth.currentUser.uid){
                        setMessages((prevMessages) => [...prevMessages,{ message: messageData.message, type: "sent"}]);
                    }else {
                        setMessages((prevMessages) => [...prevMessages,{ message: messageData.message, type: "received"}]);    
                    }
                }
            })
        
        }catch (error){
            console.log(error);
        }
      
    }
    return (
        <div className="messaging-page">
            <div className="user-list">
                <h3>Users</h3>
                <h3>{selectedUser}</h3>
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
                            className={`message ${msg.type}`}
                        >
                            {msg.message}
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
