import React from 'react';
import './MessageBox.css';

const MessageBox = ({ onUserMessageChange, onSendButtonClicked, userMessage }) => {


    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            // Prevent the default action to avoid a newline being entered
            event.preventDefault();
            // Call the onSendButtonClicked function
            onSendButtonClicked();
        }
    }

    return (
        <textarea
            className="form-control"
            placeholder="Enter your message"
            onChange={onUserMessageChange}
            onKeyDown={handleKeyDown}
            value={userMessage}
            id="message-box"></textarea>
    );
}

export default MessageBox;