import { DialogModal } from '../models';
import MessageController from './message';

class DialogController {
  constructor(socket) {
    this.socket = socket;
  }

  getDialogs = (_, res) => {
    const messageController = new MessageController(this.socket);

    DialogModal.find()
    .populate(["author", "partner"])
    .populate({
      path: "lastMessage"
    })
    .exec((err, dialogs) => {
      if (err) {
        return res.status(404).json({
          message: 'Dialogs not found',
        });
      }

      res.json(dialogs);
    });

    messageController.unreadMessages();
  }

  getDialog = userId => {
    const query = [{author: userId}, {partner: userId}];

    DialogModal.find().or(query)
    .populate(["author", "partner"])
    .populate({
      path: "lastMessage",
      populate: { path: "user" }
    })
    .exec((err, dialog) => {
      if (err) {
        return res.status(404).json({
          message: 'Dialog not found',
        });
      }

      this.socket.emit('DIALOG_RECEIVED', {dialog});
    })
  }
}

export default DialogController;