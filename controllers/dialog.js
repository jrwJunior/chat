const { DialogModal } = require('../models/Dialog');
const { MessageController } = require('./message');

class DialogController {
  constructor(socket) {
    this.socket = socket;
  }

  getDialogs = (req, res) => {
    const userId = req.user._id;
    const query = [{author: userId}, {partner: userId}];

    DialogModal.find()
    .or(query)
    .populate(["author", "partner"])
    .populate({
      path: "lastMessage",
      populate: { path: "user" }
    })
    .exec((err, dialogs) => {
      if (err) {
        return res.status(404).json({
          message: 'Dialogs not found'
        });
      }
      
      res.json(dialogs);
    });

    this.getDialog(query);
  }

  getDialog(query) {
    DialogModal.findOne()
    .or(query)
    .exec((_, dialog) => {
      if (dialog) {
        MessageController.unreadMessages(this.socket, dialog._id);
      }
    });
  }
}

module.exports = {
  DialogController
};