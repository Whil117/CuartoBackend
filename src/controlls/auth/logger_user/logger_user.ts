import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { KeyJwt } from '../../../environments/key_jwt';
import dotenv from 'dotenv';
import { UserData } from '../../../types/controllers/auth/types';

const registerUser = require('../../../models/register/register');
const router = express.Router();
dotenv.config();

router.post('/signin', async (req: Request, res: Response) => {
  const { username, password }: UserData = req.body;
  const user = await registerUser.findOne({ username });
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: 'User not found'
    });
  }
  const isPasswordValid: Boolean = await user.ComparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      error: 'Password not valid',
      message: 'Password not valid'
    });
  }
  const token = jwt.sign({ _id: user._id }, KeyJwt());
  res.status(200).json({
    token,
    auth: true,
    user: {
      _id: user._id,
      username: user.username,
      date: user.date
    }
  });
});

module.exports = router;
