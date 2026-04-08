import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';

const Chatroom = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h2><i className="fas fa-comment-dots"></i> Team Chat</h2>
      </div>
      
      <div className="chatroom-messages">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {messages.length === 0 && (
          <div className="chat-empty">No messages yet, say hi 👋</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatroom-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="chat-input-field"
        />
        <button onClick={handleSend} className="chat-send-btn">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Chatroom;