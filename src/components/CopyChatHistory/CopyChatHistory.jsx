import React from 'react';
import Button from 'react-bootstrap/Button';
import { Files } from 'react-bootstrap-icons';

const CopyChatHistory = ({ onCopyRequest }) => {
    return (
        <Button variant="outline-light" onClick={onCopyRequest}>Copy to clipboard <Files /></Button>
    );
}

export default CopyChatHistory;