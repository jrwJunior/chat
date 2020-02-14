import db from './db';

export default async(raise) => {
  try {
    const info = await db();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    raise();
  } catch(err) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
} 