import express from 'express';
import dotenv from "dotenv";
import { createServer } from "http";

import createRoutes from './core/routes';
import connectDB from './core/connect_db';
import createSocket from './core/socket';


const app = express();
const http = createServer(app);
const io = createSocket(http);
dotenv.config();

// Create routes
createRoutes(app, io);

// Connect to DB
const PORT = process.env.PORT || 8080;

http.listen(3003, () => {
  console.log(`Server: http://localhost:${3003}`);
});

connectDB(() => (
  app.listen(PORT, () => console.log(`Started ${ PORT }!`))
));
