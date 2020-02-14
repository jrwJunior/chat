import { DialogModal, MessageModal } from '../models';

class DialogController {
  constructor(socket) {
    this.socket = socket;
  }

  getDialogs = async(req, res) => {
    const userId = req.user._id;

    DialogModal.find()
    .or([{owner: userId}, {interlocutor: userId}])
    .populate(["owner", "interlocutor"])
    .populate({
      path: "lastMessage",
      populate: { path: "user" }
    })
    .exec((err, dialogs) => {
      if (err) {
        return res.status(404).json({
          message: 'Dialogs not found',
        });
      }

      res.json(dialogs);
    });
  }

  createDialog = async(req, res) => {
    const { interlocutor, message } = req.body;

    // DialogModal.findOne({ owner: req.user._id, interlocutor }, async(err, user) => {
      // if (err) {
      //   return res.status(500).json({message: err});
      // }

      // if (user) {
      //   return res.status(403).json({message: 'Such a dialogue already exists'});
      // }

      const dialog = new DialogModal({ owner: req.user._id, interlocutor });

      try {
        const dialogObj = await dialog.save();
        const msg = new MessageModal({ user: req.user._id, message, dialog: dialogObj._id });
        
        await msg.save();
        dialogObj.lastMessage = msg._id;
        await dialogObj.save();
        res.json(dialogObj);
        this.socket.emit('DIALOG_RECEIVED', {
          owner: req.user._id,
          interlocutor,
          dialog: dialogObj
        });
      } catch(err) {
        res.json(err);
      }
    // });
  }

  async deleteDialog(req, res) {
    const { id: _id } = req.params;

    // DialogModal.findOneAndDelete({ _id }, (err, dialog) => {
    //   if (!dialog) {
    //     return res.json({ message: "Dialog not found" })
    //   }

    //   res.json({ message: "Dialog deleted" });
    // })
  }
}

export default DialogController;