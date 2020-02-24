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

// schema.virtual("isOnline").get(function() {
//   return differenceInMinutes(parseISO(new Date().toISOString()), this.last_seen) < 1;
// });

// schema.set("toJSON", {
//   virtuals: true
// });

export default model('User', schema);