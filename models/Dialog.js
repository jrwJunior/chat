import { Schema, model } from 'mongoose';

const schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  interlocutor: { type: Schema.Types.ObjectId, ref: 'User' },
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' }
}, {
  timestamps: true
});

export default model('Dialog', schema);