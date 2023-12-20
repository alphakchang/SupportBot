# Alpha CRC Support-Bot - Alphai

This is a Alpha's own support bot, called Alphai, the model behind is GPT-4-turbo

## How to use

To get a response, the user simply enter their message in the message box and send.

The support bot will use the chat history as reference to respond too.

When the session ends, the history gets cleared, nothing is kept on the server.

# See below for developer notes

## The package.json file has a line called

`"homepage": "/xxx",`
This line needs to match the endpoint on the server, since it is being served as a static file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Serve options

### `serve from server` (this is my current way)

Using express.static() to serve the static file, this is the code block inside the server

```javascript
const buildPathAlphai = path.join(__dirname, '../SupportAI/build');

app.use('/alphai', (req, res, next) => {
  console.log("<<< Alphai called >>>");
  next();
}, express.static(buildPathAlphai));

app.get('/alphai/*', (req, res) => {
	res.sendFile(path.join(buildPathAlphai, 'index.html'));
});
```

### `serve -s build -l ${port}`

Once the build folder has been created, it contains everything required to be hosted.
Navigate to where the build folder is located, then use the command `serve -s build` to host it, port can be configured by adding `-l` or `-listen` followed by the port number.
