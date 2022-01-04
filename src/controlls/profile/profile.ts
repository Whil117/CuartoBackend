import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { KeyJwt } from '../../environments/key_jwt';
import dotenv from 'dotenv';

const registerUser = require('../../models/register/register');
const router = express.Router();
dotenv.config();

router.put('/profile/avatar', async (req: Request, res: Response) => {
  const token: string | string[] | any =
    req.headers['token'] && req.headers['token'];

  if (!token) {
    res.status(401).json({
      message: {
        title: 'Authorization',
        text: 'You are not authorized to access this resource'
      }
    });
  }
  const decoded: string | any = jwt.verify(token, KeyJwt());
  if (!decoded) {
    res.status(401).json({
      message: {
        title: 'Token',
        text: 'Token is invalid'
      }
    });
  }
  const user = await registerUser.findOne({ _id: decoded._id });
  if (!user) {
    res.status(404).json({
      message: {
        title: 'User not found',
        text: 'This user is not registered'
      }
    });
  }

  user.avatar = req.body.avatar;
  try {
    await user.save();
    res.status(200).json({
      message: {
        title: 'Success',
        text: 'Your avatar has been saved'
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
