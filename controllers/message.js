import { MessageModal, DialogModal } from '../models';

class MessageController {
  constructor(socket) {
    this.socket = socket;
  }

  readMessage = (res, userId, dialogId) => {
    const filter = { dialog: dialogId, user: { $ne: userId } };

    MessageModal.updateMany(filter, { $set: { readed: true } }, err => {
      if (err) {
        return res.status(500).json({ message: err });
      }
    });
  }

  getMessages = async(req, res) => {
    const dialogId = req.query.dialog;
    const userId = req.user._id;

    this.readMessage(req, userId, dialogId);
    MessageModal
    .find({ dialog: dialogId })
    .populate("user")
    .exec((err, message) => {
      if (err) {
        return  res.json({message: "Dialogs not found"});
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

          messageObj.populate('user', async(err, message) => {
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

            this.socket.to('guys').emit('MESSAGE_RECEIVED', {
              message
            })
          });
        }
      } catch(err) {
        res.json(err);
      }
    });
  }

  deleteMessage = (req, res) => {
    const id = req.query.id;
    const userId = req.user._id;

    MessageModal.findById(id, async(err, message) => {
      if (message.user.toString() === userId) {
        const dialogId = message.dialog;
        const query = { dialog: dialogId };

        await message.remove();

        MessageModal.findOne(query, {}, {sort: { createdAt: -1 }}, (err, lastMessage) => {
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

          MessageModal
          .find({ dialog: dialogId })
          .populate("user")
          .exec((err, messages) => {
            this.socket.emit('MESSAGE_RECEIVED', {messages});
          });
        });
      } else {
        res.status(403).json({message: 'Not have permission'});
      }
    });
  }
}

export default MessageController;