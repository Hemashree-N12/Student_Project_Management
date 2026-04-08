import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';

const Chatroom = ({ messages, onSendMessage, group, user }) => {
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

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h2>
          <i className="fas fa-comment-dots"></i> 
          {group ? `${group.name} Chat` : 'Team Chat'}
        </h2>
        <div className="online-count">
          <i className="fas fa-circle online-indicator"></i>
          {group?.members.length || 0} members online
        </div>
      </div>
      
      <div className="chatroom-messages">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} isOwn={msg.senderId === user?.id} />
        ))}
        {messages.length === 0 && (
          <div className="chat-empty">No messages yet. Start the conversation! 💬</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatroom-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
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