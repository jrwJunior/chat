const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, },
  surname: { type: String, required: true, },
  avatar: String,
  userName: String,
  last_seen: { type: Date, default: new Date() }
}, {
  timestamps: true
});

module.exports = {
	UserModal: model('User', schema)
};