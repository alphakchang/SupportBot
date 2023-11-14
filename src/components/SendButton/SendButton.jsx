import React from 'react';
import './SendButton.css';

const SendButton = ({ onSendButtonClicked }) => {
    return (
        <button type="button" onClick={onSendButtonClicked}>Send</button>
    );
}

export default SendButton;