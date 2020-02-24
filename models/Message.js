import { Schema, model } from 'mongoose';

const schema = new Schema({
  message: { type: String, required: true },
  dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  readed: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default model('Message', schema);