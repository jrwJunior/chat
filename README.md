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
MIT License

Copyright (c) 2020 Gromov Dmitry

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
