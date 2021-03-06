const { DialogModal } = require('../models/Dialog');
const { MessageModal } = require('../models/Message');

class MessageController {
  constructor(socket) {
    this.socket = socket;
  }
  
  messageRead = (req, res) => {
    const userId = req.user._id;
    const dialogId = req.query.dialog;

    if (dialogId.match(/^[0-9a-fA-F]{24}$/)) {
      MessageModal.updateMany(
        { dialog: dialogId, user: { $ne: userId } },
        { $set: { readed: true } },
        { "multi": true, new: true },
        (err) => {
          if (err) {
            return res.status(500).json({
              status: 'error',
              message: err,
            });
          }

          this.socket.to(dialogId).emit('MESSAGES_READED', {
            dialogId
          });
        }
      );
    }
  };

  static unreadMessages = (socket, dialogId, userId) => {
    MessageModal.find({readed: {$ne: true}, dialog: dialogId}).countDocuments((err, count) => {
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }

      socket.emit('MESSAGES_NO_READ', {
        unread: count,
        dialogId,
        userId
      });
    })
  }

  getMessages = async(req, res) => {
    const dialogId = req.query.dialog;
    const isEmpty = [];

    if (dialogId.match(/^[0-9a-fA-F]{24}$/)) {
      MessageModal
      .find({dialog: dialogId})
      .populate('user')
      .exec((err, messages) => {
        if (err) {
          return res.status(400).json(err);
        }
        
        res.status(200).json(messages);
      });
    } else {
      return res.json(isEmpty);
    }
  }

  createMessage = async(req, res) => {
    const userId = req.user._id;
    const { message, user, author, replyMessage } = req.body;
    const query = ["author", "partner"];

    DialogModal
      .findOne({partner: {$in: [userId, user]}}, async(err, dialog) => {
        if (err) {
          return res.json(err);
        }

        try {
          if (!dialog) {
            const dialog = new DialogModal({ author: userId, partner: user });
            const dialogObj = await dialog.save();
    
            const msg = new MessageModal({ message, dialog: dialogObj._id, user: userId });
            const messageObj = await msg.save();

            messageObj.populate('user', async(err, message) => {
              if (err) {
                return res.status(500).json({ message: err});
              }

              dialogObj.lastMessage = msg._id;
              await dialogObj.save();

              DialogModal.findById(dialogObj._id)
              .populate(query)
              .populate({path: "lastMessage", populate: { path: "user" }})
              .exec((err, dialog) => {
                if (err) {
                  return res.status(404).json({
                    message: 'Dialog not found',
                  });
                }

                this.socket.emit('DIALOG_RECEIVED', {dialog});
              })

              this.socket.to(dialogObj._id).emit('MESSAGE_RECEIVED', {message});
              MessageController.unreadMessages(this.socket, dialogObj._id, userId);
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
                return res.status(400).json({ message: err});
              }
  
              DialogModal.findOneAndUpdate(query, update, options, err => {
                if (err) {
                  return res.status(400).json({
                    message: err,
                  });
                }
              });

              this.socket.to(dialog._id).emit('MESSAGE_RECEIVED', {message});
              MessageController.unreadMessages(this.socket, dialog._id, userId);
              this.socket.emit('LAST_MESSAGE', {
                lastMessage: message,
                dialogId: dialog._id
              });
            });
          }
        } catch(err) {
          res.json(err);
        }
      });
  }

  editMessage = (req, res) => {
    const { id, message, dialogId } = req.body;

    MessageModal.findByIdAndUpdate({_id: id}, {edited: true, message}, { new: true }, (err, message) => {
      if (err) {
        return res.status(400).json(err);
      }

      message.populate('user', (err, editedMessage) => {
        if (err) {
          return res.status(400).json(err);
        }

        this.socket.to(dialogId).emit('MESSAGE_EDITING', {
          editedMessage
        });
      });
    });
  }

  updateLastMessage = (dialogId, userId) => {
    MessageModal
    .findOne({ dialog: dialogId }, {}, {sort: { createdAt: -1 }})
    .populate('user')
    .exec((err, lastMessage) => {
      if (err) {
        return res.status(400).json({
          message: err,
        });
      }

      DialogModal.findById(dialogId, (err, dialog) => {
        if (err) {
          return res.status(400).json({
            message: err,
          });
        } 

        dialog.lastMessage = lastMessage;
        dialog.save();
      });

      this.socket.to(dialogId).emit('LAST_MESSAGE', {
        lastMessage,
        dialogId
      });
      MessageController.unreadMessages(this.socket, dialogId, userId);
    });
  }

  deleteMessage = (req, res) => {
    const { messages, dialogId } = req.body;
    const userId = req.user._id;

    MessageModal.deleteMany({_id: {$in: messages}}, err => {
      if (err) {
        return res.status(400).json({
          message: err,
        });
      }

      this.updateLastMessage(dialogId, userId);
      this.socket.to(dialogId).emit('DELETE_MESSAGE', {
        deleteMessage: messages
      });
    });
  }
}

module.exports = {
  MessageController
};