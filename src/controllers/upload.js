import cloudinary from "../core/cloudinary";
import { UserModal } from '../models';

class UploadController {
  uploadFile(req, res) {
    const file = req.file;
    const userId = req.user;

    const options = {
      resource_type: "auto",
      folder: 'avatars',
      transformation: [
        {width: 400, height: 400, gravity: "face", radius: "max", crop: "fill"},
        {width: 200, height: 200, crop: "fill"}
      ]
    };

    cloudinary.v2.uploader.upload_stream(options, (err, data) => {
      if (err) {
       return res.status(400).json(err);
      }

      const query = { _id: userId };
      const update = { avatar: data.url };
      const options = { new: true, upsert: true };
      
      UserModal.findOneAndUpdate(query, update, options, err => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        }
      });
    }).end(file.buffer);
  }
};

export default UploadController;