const { UserModal } = require('../models');

module.exports = (req, _, next) => {
  if (req.user) {
    UserModal.findOneAndUpdate(
      { 
        _id: req.user._id 
      },
      {
        last_seen: new Date()
      },
      // { new: true },
      (err, doc) => {}
    );
  }
  next();
};