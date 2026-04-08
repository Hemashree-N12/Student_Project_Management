import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className="chat-message">
      <div className="chat-message-avatar">
        {message.avatar || message.sender[0]}
      </div>
      <div className="chat-message-content">
        <div className="chat-message-header">
          <span className="chat-message-sender">{message.sender}</span>
          <span className="chat-message-time">{message.timestamp}</span>
        </div>
        <p className="chat-message-text">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;