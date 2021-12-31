import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { KeyJwt } from '../../environments/key_jwt';
import dotenv from 'dotenv';

const registerUser = require('../../models/register/register');
const router = express.Router();
dotenv.config();

router.post('/verify', async (req: Request, res: Response) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided'
    });
  }
  try {
    const decoded: any = jwt.verify(token, KeyJwt());
    const user = await registerUser.findById(decoded?._id);
    if (user) {
      return res.status(200).json({
        auth: true
      });
    } else {
      return res.status(401).json({
        auth: false,
        message: 'Token is not valid'
      });
    }
  } catch (error) {
    return res.status(500).json({
      auth: false,
      message: 'Failed to authenticate token'
    });
  }
});
module.exports = router;
