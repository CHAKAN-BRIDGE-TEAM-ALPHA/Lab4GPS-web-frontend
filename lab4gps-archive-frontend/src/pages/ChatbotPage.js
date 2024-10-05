import React, { useState } from 'react';
import './ChatbotPage.css'; // Importing the styling file for this page
import ChatWindow from '../../src/Chatbot/ChatWindow'; // Chat window component
import { AiOutlineMessage } from 'react-icons/ai'; // React Chatbot Icon
import { AiOutlineClose } from 'react-icons/ai'; // React Close Icon

const ChatbotPage = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility
  const initialMessages = [
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
    { sender: 'bot', text: 'Feel free to ask me about the Chakan Bridge or any Lab4GPS project.' },
  ];

  const toggleChatbot = () => {
    setIsOpen(!isOpen); // Toggle the chatbot open/close state
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <AiOutlineMessage size={40} />
      </div>

      {/* Chatbot Interface */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h2>Lab4GPS AI Chatbot</h2>
            <p>Ask about the Chakan Bridge or Lab4GPS projects</p>
            <AiOutlineClose className="close-icon" size={25} onClick={toggleChatbot} /> {/* Close Icon */}
          </div>
          <div className="chatbot-body">
            <ChatWindow initialMessages={initialMessages} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
