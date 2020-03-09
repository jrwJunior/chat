import { MessageModal, DialogModal } from '../models';

class MessageController {
  constructor(socket) {
    this.socket = socket;
  }

  getMessages = async(req, res) => {
    const dialogId = req.query.dialog;

    MessageModal
    .find({ dialog: dialogId })
    .populate("user")
    .exec((err, message) => {
      if (err) {
        return  res.json({message: "Messages not found"});
      }

      res.json(message);
    });
  }

  getDialog = async(userId) => {
    const query = [{owner: userId}, {interlocutor: userId}];

    return await DialogModal.find().or(query)
    .populate(["owner", "interlocutor"])
    .populate({
      path: "lastMessage",
      populate: { path: "user" }
    });
  }

  createMessage = async(req, res) => {
    const userId = req.user._id;
    const { message, interlocutor, dialogId } = req.body;

    DialogModal.findById(dialogId, async(err, dialog) => {
      if (err) {
        return res.json(err);
      }

      try {
        if (!dialog) {
          const dialog = new DialogModal({ owner: req.user._id, interlocutor });
          const dialogObj = await dialog.save();
  
          const msg = new MessageModal({ message, dialog: dialogObj._id, user: userId });
          const messageObj = await msg.save();
          
          dialogObj.lastMessage = msg._id;
          await dialogObj.save();
          const newObject = await this.getDialog(userId);
          
          this.socket.emit('DIALOG_RECEIVED', newObject);
          this.socket.emit('MESSAGE_RECEIVED', messageObj);
        } else {
          const msg = new MessageModal({ message, dialog: dialogId, user: userId });
          const messageObj = await msg.save();

          messageObj.populate('user', (err, message) => {
            const query = { _id: dialogId };
            const update = { lastMessage: message._id };
            const options = { new: true, upsert: true };

            if (err) {
              return res.status(500).json({ message: err});
            }

            DialogModal.findOneAndUpdate(query, update, options, err => {
              if (err) {
                return res.status(500).json({
                  message: err,
                });
              }
            });

            this.socket.to('guys').emit('MESSAGE_RECEIVED', {message});
            this.socket.to('guys').emit('LAST_MESSAGE', {lastMessage: message});
          });
        }
      } catch(err) {
        res.json(err);
      }
    });
  }

  editMessage = (req, res) => {
    const { id, message } = req.body;

    MessageModal.findByIdAndUpdate({_id: id}, {edited: true, message}, { new: true }, err => {
      if (err) {
        return res.json(err);
      }
    });

    MessageModal
      .findById(id)
      .populate("user")
      .exec((err, message) => {
        if (err) {
          return res.json({message: "Messages not found"});
        }

        this.socket.to('guys').emit('MESSAGE_EDITING', {
          editedMessage: message
        });
      });
  }

  updateMessages = dialogId => {
    MessageModal
      .find({ dialog: dialogId })
      .populate("user")
      .exec((err, messages) => {
        this.socket.to('guys').emit('DELETE_MESSAGE', {
          deleteMessage: messages
        });
      });
  }

  updateLastMessage = dialogId => {
    MessageModal.findOne({ dialog: dialogId }, {}, {sort: { createdAt: -1 }}, (err, lastMessage) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }

      DialogModal.findById(dialogId, (err, dialog) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        }

        dialog.lastMessage = lastMessage;
        dialog.save();
      });

      this.socket.emit('DIALOG_RECEIVED', {lastMessage});
    });
  }

  deleteMessage = (req, res) => {
    const { messages, dialogId } = req.body;

    MessageModal.deleteMany({_id: {$in: messages}}, (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      console.log(doc);
      this.updateLastMessage(dialogId);
      // this.updateMessages(dialogId);
    });
  }
}

export default MessageController;