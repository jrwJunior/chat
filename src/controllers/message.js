import { MessageModal, DialogModal } from '../models';
import DialogController from './dialog';

class MessageController {
  constructor(socket) {
    this.socket = socket;
  }
  
  messageRead = (req, res) => {
    const userId = req.user._id;
    const dialogId = req.query.dialog;

    MessageModal.updateMany(
      { dialog: dialogId, user: { $ne: userId } },
      { $set: { readed: true } },
      { "multi": true },
      err => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: err,
          });
        }

        MessageModal
        .findOne()
        .sort({createdAt: -1})
        .exec((err, message) => {
          if (err) {
            return res.json(err);
          }
    
          this.socket.to(dialogId).emit('MESSAGES_READED', {
            dialogId: message.dialog,
            readed: message.readed
          });
        });
      }
    );
  };

  unreadMessages = () => {
    MessageModal.find({readed: {$ne: true}}).countDocuments((err, count) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }

      this.socket.emit('MESSAGES_NO_READ', {unread: count});
    })
  }

  getMessages = async(req, res) => {
    const userId = req.user._id;
    const query = [{author: userId},{partner: userId}];

    DialogModal
    .findOne()
    .or(query)
    .exec(async(err, dialog) => {
      if (err) {
        return res.json(err);
      }

      MessageModal
      .find({dialog: dialog._id})
      .populate('user')
      .exec((err, messages) => {
        if (err) {
          return res.json({message: "Messages not found"});
        }

        res.json(messages);
      });
    });
  }

  createMessage = async(req, res) => {
    const userId = req.user._id;
    const { message, user, author, replyMessage } = req.body;
    const query = [{author: userId},{partner:userId}];
    const newDialog = new DialogController(this.socket);

    DialogModal
      .findOne()
      .or(query)
      .exec(async(err, dialog) => {
        if (err) {
          return res.json(err);
        }

        try {
          if (!dialog) {
            const dialog = new DialogModal({ author: userId, user });
            const dialogObj = await dialog.save();
    
            const msg = new MessageModal({ message, dialog: dialogObj._id, user: userId });
            const messageObj = await msg.save();

            messageObj.populate('user', async(err, message) => {
              if (err) {
                return res.status(500).json({ message: err});
              }

              dialogObj.lastMessage = msg._id;
              await dialogObj.save();
              newDialog.getDialog(userId, this.socket);

              this.socket.to(dialog._id).emit('MESSAGE_RECEIVED', {message});
            });
          } else {
            const data = {
              author,
              message: replyMessage
            }
            const msg = new MessageModal({ 
              message,
              dialog: dialog._id,
              user: userId,
              replyMessage: (!author || !replyMessage) ? [] : data
            });
            const messageObj = await msg.save();

            messageObj.populate(['user'], (err, message) => {
              const query = { _id: dialog._id };
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

              this.socket.to(dialog._id).emit('MESSAGE_RECEIVED', {message});
              this.unreadMessages();
            });

            this.socket.emit('LAST_MESSAGE', {lastMessage: messageObj});
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

        this.socket.to(message.dialog).emit('MESSAGE_EDITING', {
          editedMessage: message
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
      
      this.socket.to(dialogId).emit('LAST_MESSAGE', {lastMessage});
      this.unreadMessages();
    });
  }

  deleteMessage = (req, res) => {
    const { messages, dialogId } = req.body;

    MessageModal.deleteMany({_id: {$in: messages}}, err => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }

      this.updateLastMessage(dialogId);
      this.socket.to(dialogId).emit('DELETE_MESSAGE', {
        deleteMessage: messages
      });
    });
  }
}

export default MessageController;