const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { createServer } = require('http');

const routing = require('./routes');
const verifyToken = require('./middlewares/verifyToken');
const createSocket = require('./core/socket');
const connectDB = require('./core/connectDB');

const app = express();
const http = createServer(app);
const socket = createSocket(http);

app.use(express.json({ extended: true }));
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use('/', express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use(verifyToken);

routing(app, socket);
connectDB();

http.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});

// app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));