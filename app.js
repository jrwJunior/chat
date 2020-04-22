const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createServer } = require('http');

const router = require('./routes');
const createSocket = require('./core/socket');

const app = express();
const http = createServer(app);
const socket = createSocket(http);
const routes = router(socket);
const PORT = process.env.PORT || 8000;

app.use(express.json({ extended: true }));
dotenv.config();

// Routing
app.use('/api', routes);

// DB Connect
const dbPath = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat';
mongoose.Promise = global.Promise;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
};

mongoose.connect(dbPath, options);

const db = mongoose.connection;

db.on("error", () => {
    console.log(" error occurred from the database");
});
db.once("open", () => {
    console.log(" successfully connect the database");
});

// Http Listen
http.listen(PORT);