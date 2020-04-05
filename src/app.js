import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer } from 'http';

import createdRouting from './routes';
import verifyToken from './middlewares/verifyToken';
import createSocket from './core/socket';
import connectMongo from './core/connectMongo';

const app = express();
const http = createServer(app);
const socket = createSocket(http);

app.use(express.json({ extended: true }));
app.use(verifyToken);
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

createdRouting(app, socket);
connectMongo(app);

http.listen(3003, () => {
  console.log(`Server: http://localhost:${3003}`);
});