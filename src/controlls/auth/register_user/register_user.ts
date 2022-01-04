import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { KeyJwt } from '../../../environments/key_jwt';
import dotenv from 'dotenv';

const registerUser = require('../../../models/register/register');
const router = express.Router();
dotenv.config();

router.get('/signup', async (_, res: Response) => {
  res.status(405).json({
    error: 'Method not allowed',
    message: 'method signin get does not exist'
  });
});

router.post('/signup', async (req: Request, res: Response) => {
  const user = await new registerUser({
    ...req.body
  });
  const isUserExist: Boolean = await registerUser.findOne({
    username: user.username
  });

  if (isUserExist) {
    return res.status(405).json({
      message: {
        title: 'User already exist',
        text: 'This user is already registered'
      }
    });
  }
  try {
    user.password = await user.EncryptPassword(user.password);
    await user.save();
    const token = jwt.sign({ _id: user._id }, KeyJwt());

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        date: user.date
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
