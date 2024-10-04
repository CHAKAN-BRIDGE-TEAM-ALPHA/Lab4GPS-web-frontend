import React, { useState } from 'react';
import './ChatWindow.css'; // Importing styling for ChatWindow
import ChatbotInterface from './ChatbotInterface'; // Chatbot conversation UI

const ChatWindow = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'This is a dummy response from the bot.' },
        ]);
      }, 1000);
      setInput(''); // Clear input field
    }
  };

  return (
    <div className="chat-window">
      <ChatbotInterface messages={messages} />
      <form className="chat-input-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
