const { Schema, model } = require('mongoose');

const schema = new Schema({
  message: { type: String, required: true },
  dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  edited: { type: Boolean, default: false },
  readed: { type: Boolean, default: false },
  replyMessage: {type: [{
    author: { type: String },
    message: { type: String }
  }]}
}, {
  timestamps: true
});

module.exports = {
  MessageModal: model('Message', schema)
};