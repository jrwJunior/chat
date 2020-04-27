IChat
=========
The server part is developed on NodeJS and using Socket.io libraries under the hood to support websockets for realtime collaboration. The client side use Reactjs, Redux, React Router, Redux-Saga

## Demo

Try out for yourself on the demo site here in Heroku: [https://appichat.herokuapp.com/]

## Installation

Clone the repository from Github
```
$ git clone https://github.com/jrwJunior/chat.git
```

## NPM Scripts
```
"scripts": {
    "start": "node app.js",
    "server": "nodemon app.js",
    "build": "cd client && npm run build",
    "client": "npm start --prefix client",
    "dev": "cross-env NODE_ENV=development concurrently \"npm run server\" \"npm run client\""
  }
```
