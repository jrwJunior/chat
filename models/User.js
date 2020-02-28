import { Schema, model } from 'mongoose';
import differenceInMinutes from "date-fns/differenceInMinutes";
import parseISO from 'date-fns/parseISO';

const schema  = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, },
  surname: { type: String, required: true, },
  avatar: String,
  last_seen: { type: Date, default: new Date() }
}, {
  timestamps: true
});

export default model('User', schema);