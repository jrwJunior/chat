const mongoose = require('mongoose');

module.exports = () => {
  try {
    new Promise((resolve, reject) => {
      mongoose.Promise = global.Promise;
  
      mongoose.connection
        .on('error', error => reject(error))
        .on('close', () => console.log('Database connection closed.'))
        .once('open', () => resolve(mongoose.connections[0]));
  
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
    });
  } catch(err) {
    process.exit(1);
  }
} 