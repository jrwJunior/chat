import { UserModal } from '../models';
import bcrypt from 'bcryptjs';

import { Validator } from '../utils/validation';
import createJWTToken from '../utils/createJWToken';

class UserController {
  constructor() {
    this.validate = new Validator();
  }

  getAuthUser(req, res) {
    const id = req.user && req.user._id;

    UserModal.findById(id, (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.json(user);
    });
  }

  getUser(req, res) {
    const id = req.params.id;

    UserModal.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: err
        });
      }

      res.json(user);
    })
  }

  findUser(req, res) {
    const { query } = req.query;
    const id = req.user._id;
    const foundUsers = [];

    if (!query) {
      return res.json(foundUsers);
    }

    UserModal.find()
    .or([
      { firstName: new RegExp(query, 'i') },
      { surname: new RegExp(query, 'i') },
      { email: new RegExp(query, 'i') },
    ])
    .then(users => {
      users.forEach(item => {
        if (item._id != id) {
          foundUsers.push(item);
        }
      });
      
      res.json(foundUsers);
    })
    .catch(err => res.status(404).json({message: err}));
  }

  createUser = async(req, res) =>  {
    const { error } = this.validate.validRegister(req.body);
    const { email, password, firstName, surname } = req.body;

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      })
    }

    const emailExist = await UserModal.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        status: 'error',
        message: "Email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new UserModal({ email, password: hashPassword, firstName, surname });

    try {
      const data = await user.save();
      res.json({
        status: 'success',
        data
      });
    } catch(err) {
      res.status(400).json(err);
    }
  }

  login = async(req, res) => {
    const { error } = this.validate.validLogin(req.body);
    const { email, password } = req.body;

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message
      })
    }

    try {
      const user = await UserModal.findOne({ email });

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "The specified data is incorrect. Try again."
        });
      }

      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass) {
        return res.status(400).json({
          status: "error",
          message: "The email and password you entered did not match our records."
        });
      }

      const token = createJWTToken(user);
      res.header('Authorization', token);

      res.json({
        status: "success",
        user
      });
    } catch(err) {
      console.log(err)
      res.json({ err })
    }
  }
}

export default UserController;