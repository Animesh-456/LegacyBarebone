import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket = io(ENDPOINT);
const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const room = 'Chat Group'; // Replace with the room name you want to join

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, [socket]);

    const sendMessage = async () => {
        if (inputMessage.trim() !== '') {
            const newMessage = {
                user: name, // Replace this with the actual user name or ID
                content: inputMessage,
            };
            await socket.emit('sendMessage', newMessage, room, name);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputMessage('');
        }
    };

    const hahdleview = () => {
        if (name != "") {
            socket.emit('joinRoom', name, room);
            setview(true)
        }
        return
    }

    const [view, setview] = useState(false)
    const [name, setname] = useState("");

    return (
        <>
            <div>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
                {/* <button onClick={sendMessage}>Send</button> */}
                <button onClick={hahdleview}>Join Room</button>
            </div>

            {view ? (
                <div>
                    <h3>{room}</h3>
                    <div>
                        {messages.map((message, index) => (
                            <div key={index}>
                                <strong>{message.user}:</strong> {message.content}
                            </div>
                        ))}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>

            ) : (<></>)}
        </>
    );
};

export default ChatApp;
