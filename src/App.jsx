import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import WaveAnimation from './components/WaveAnimation/WaveAnimation';
import ChatLogs from './components/ChatLogs/ChatLogs';
import MessageBox from './components/MessageBox/MessageBox';
import SendButton from './components/SendButton/SendButton';

const initialState = {
  proxy: 'http://localhost:5001',
  userMessage: '',
  messages: [
    { "role": "system", "content": "Your name is Alphai, you are a helpful assistant" }
  ]
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  logRef = React.createRef(); // Create a reference to the ChatLogs component

  onUserMessageChange = (event) => {
    this.setState({
      userMessage: event.target.value
    });
  }

  onSendButtonClicked = () => {
    if (!this.state.userMessage.trim()) {
      // do nothing if the userMessage is empty
      console.log('userMessage is empty');
    } else {
      this.setState(prevState => ({
        messages: [...this.state.messages, { role: 'user', content: this.state.userMessage }],
        userMessage: ''
      }), () => {
        this.logRef.current.filterSystemMessage();
        this.logRef.current.handleCallGPT();
      });
    }
  }

  onBotResponse = (response) => {
    this.setState(prevState => ({
      messages: [...this.state.messages, { role: 'assistant', content: response }]
    }), () => {
      this.logRef.current.filterSystemMessage();
    });
  }

  render() {
    return (
      <div>
        <div className="mb-5">
          <WaveAnimation />
          <Navigation />
        </div>

        <div className="container-lg" id='chatContainer'>
          <div className="row my-1">
            <ChatLogs proxy={this.state.proxy} messages={this.state.messages} onBotResponse={this.onBotResponse} ref={this.logRef} />
          </div>
          <hr className='border-secondary border-2 opacity-50' />
          <div className="row my-1">
            <div className="col-md-10 col-xxl-11">
              <MessageBox onUserMessageChange={this.onUserMessageChange} onSendButtonClicked={this.onSendButtonClicked} userMessage={this.state.userMessage} />
            </div>
            <div className="col-md-2 col-xxl-1 d-flex align-items-center justify-content-center">
              <SendButton onSendButtonClicked={this.onSendButtonClicked} />
            </div>
          </div>
        </div>
        <div className="my-5">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
