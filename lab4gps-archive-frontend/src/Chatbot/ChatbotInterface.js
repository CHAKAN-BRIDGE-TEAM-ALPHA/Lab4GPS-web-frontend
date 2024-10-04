import React from 'react';
import './ChatbotInterface.css'; // Importing styling for ChatbotInterface

const ChatbotInterface = ({ messages }) => {
  return (
    <div className="chatbot-interface">
      {messages.length === 0 ? (
        <p className="no-messages">No conversation yet. Start chatting!</p>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <p>{message.text}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatbotInterface;
