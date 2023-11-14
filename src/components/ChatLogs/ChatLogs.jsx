import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import './ChatLogs.css';
import CallGPT from '../CallGPT/CallGPT';
import { Person, GpuCard } from 'react-bootstrap-icons';

class ChatLogs extends Component {

    gptRef = React.createRef(); // Create a reference to the CallGPT component

    filterSystemMessage = () => {
        const { messages } = this.props;
        const lastMessage = messages[messages.length - 1];

        if (lastMessage.role === 'system') {
            // Do nothing, don't display the system message
        } else {
            this.displayMessage(lastMessage);
        }
    }

    convertNewlinesToBreaks = (str) => {
        return str.replace(/\n/g, '<br>');
    }

    // displayMessage = (message) => {
    //     const chatLogs = document.getElementById('chatlogs');
    //     const newMessage = document.createElement('div');
    //     newMessage.className = message.role;

    //     // Check the role of the message and prepend the appropriate label
    //     let label = message.role === 'user' ? 'You' : 'AI Support';
    //     newMessage.innerHTML = `${label}:<br>${this.convertNewlinesToBreaks(message.content)}`;

    //     // Prepend the new message so it appears at the bottom due to column-reverse
    //     chatLogs.prepend(newMessage);
    // }

    displayMessage = (message) => {
        const chatLogs = document.getElementById('chatlogs');
        const newMessageDiv = document.createElement('div');
        newMessageDiv.className = message.role;
    
        // Determine the label based on the role
        const label = message.role === 'user' ? '  You' : '  AI Support';
        const content = this.convertNewlinesToBreaks(message.content);
    
        // Append the new div to chatLogs first
        chatLogs.prepend(newMessageDiv);
    
        // Then create a root for that div and render the component
        const root = createRoot(newMessageDiv);
        root.render(
            <div>
                {message.role === 'user' ? <Person /> : <GpuCard />}
                {label}:<br />
                <span dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }
     


    handleCallGPT = () => {
        this.gptRef.current.runCall();
    }

    handleApiResponse = (response) => {
        this.props.onBotResponse(response);
        this.clearTempResponse();
    }

    clearTempResponse = () => {
        this.gptRef.current.clearResponse();
    }

    render() {
        return (
            <>
                <div className="border-top border-secondary border-2" id="chatlogs">
                    {/* Messages will appear here */}
                </div>
                <div id='temp-response'>
                    <CallGPT proxy={this.props.proxy} messages={this.props.messages} handleApiResponse={this.handleApiResponse} ref={this.gptRef} />
                </div>
            </>

        );
    }
}

export default ChatLogs;