import React, { Component } from 'react';
import OpenAI from 'openai';

const textToHtml = (text) => {
    return text.split('\n').map((str, index, array) => (
        <React.Fragment key={index}>
            {str}
            {index === array.length - 1 ? null : <br />}
        </React.Fragment>
    ));
}

class CallGPT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proxy: props.proxy,
            response: '',
            openai: null
        }
    }

    componentDidMount() {
        this.initializeOpenAI();
    }

    async initializeOpenAI() {
        try {
            let response = await fetch(`${this.state.proxy}/apikey`);

            if (!response.ok) {
                throw new Error('Unable to retrieve API Key');
            }

            let data = await response.json();
            let key = data.key;

            const openaiInit = new OpenAI({
                apiKey: key,
                dangerouslyAllowBrowser: true
            });

            this.setState({ openai: openaiInit });

        } catch (error) {
            console.error('Could not fetch API key', error);
        }
    }

    async ensureOpenAIInitialized() {
        if (!this.state.openai) {
            await this.initializeOpenAI();
        }

        // Check if openai is still not initialized, then throw an error.
        if (!this.state.openai) {
            throw new Error('OpenAI failed to initialize');
        }
    }

    async callApi() {
        await this.ensureOpenAIInitialized();

        const { openai } = this.state;
        const messagesToProcess = this.props.messages.slice(-5); // send only the last five messages as context, saving money

        const completion = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            // model: "gpt-3.5-turbo-1106",
            messages: messagesToProcess,
            stream: true,
            temperature: 0.1
        });

        
        for await (const chunk of completion) {
            if (chunk.choices && chunk.choices[0].delta && chunk.choices[0].delta.content) {
                await new Promise((resolve, reject) => {
                    let responseContent = this.state.response;
                    this.setState({ response: responseContent += chunk.choices[0].delta.content }, resolve);
                });
            }
        }
    }

    async runCall() {
        try {
            // Await the callApi method.
            await this.callApi();
            this.props.handleApiResponse(this.state.response);

        } catch (error) {
            // If there is any error in the API call, it will be caught here.
            console.error('Error during API call:', error);
        }
    }

    clearResponse = () => {
        this.setState({ response: '' });
    }

    render() {
        return (
            <>
                { textToHtml(this.state.response) }
            </>
        );
    }
}

export default CallGPT;