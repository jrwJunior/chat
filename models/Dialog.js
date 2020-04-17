const { Schema, model } = require('mongoose');

const schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  partner: { type: Schema.Types.ObjectId, ref: 'User' },
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' }
}, {
  timestamps: true
});

module.exports = {
	DialogModal: model('Dialog', schema)
};