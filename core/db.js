import mongoose from 'mongoose';

export default () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    // mongoose.set('debug', true);

    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  });
}