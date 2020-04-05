import mongoose from 'mongoose';

export default async(app) => {
  const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat';
  const PORT = process.env.PORT || 8000;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }

  try {
    await mongoose.connect(mongoDB, options);
    app.listen(PORT, () => console.log(`Started ${ PORT }!`));
  } catch(err) {
    console.log('Server Error', err.message);
    process.exit(1);
  }
} 