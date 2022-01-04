import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { KeyJwt } from '../../environments/key_jwt';
import dotenv from 'dotenv';

const registerUser = require('../../models/register/register');
const router = express.Router();
dotenv.config();

router.put('/profile', async (req: Request, res: Response) => {
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
  const updateUser = await registerUser.findOneAndUpdate(
    { _id: decoded._id },
    {
      $set: {
        avatar: req.body.avatar,
        name: req.body.name,
        email: req.body.email
      }
    },
    { useFindAndModify: false }
  );

  try {
    await updateUser.save();
    res.status(200).json({
      message: {
        title: 'Success',
        text: 'Your profile has been update'
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
