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
        return  res.json({message: "Dialogs not found"});
      }

      res.json(message);
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

          const newDialog = await DialogModal.find()
          .or([{owner: userId}, {interlocutor: userId}])
          .populate(["owner", "interlocutor"])
          .populate({
            path: "lastMessage",
            populate: {
              path: "user"
            }
          });
          
          this.socket.emit('DIALOG_RECEIVED', newDialog);
          this.socket.emit('MESSAGE_RECEIVED', messageObj);

          res.json(messageObj);
        } else {
          const msg = new MessageModal({ message, dialog: dialogId, user: userId });
          const messageObj = await msg.save();
          
          messageObj.populate(['dialog', 'user'], (err, message) => {
            const query = { _id: dialogId };
            const update = { lastMessage: message._id };
            const options = { upsert: true };

            if (err) {
              return res.status(500).json({
                status: 'error',
                message: err,
              });
            }

            DialogModal.findOneAndUpdate(query, update, options, (err, dialog) => {
              if (err) {
                return res.status(500).json({
                  message: err,
                });
              }
            });

            this.socket.emit('MESSAGE_RECEIVED', message);
            res.json(message);
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

        MessageModal.findOne(query, {}, {sort: { _id : -1 }}, (err, lastMessage) => {
          DialogModal.findById(dialogId, (err, dialog) => {
            dialog.lastMessage = lastMessage;
            dialog.save();
          });
        });

        res.json({message: 'Message deleted'});
      } else {
        res.status(403).json({message: 'Not have permission'});
      }
    });
  }
}

export default MessageController;