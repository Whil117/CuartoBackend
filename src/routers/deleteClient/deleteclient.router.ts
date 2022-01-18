import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { KeyJwt } from '../../environments/key_jwt';

const AddClient = require('../../models/addclient/addclient.model');
const router = express.Router();
dotenv.config();

router.post('/deleteclient', async (req: Request, res: Response) => {
  const token: string | any = req.headers['token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  const decoded = jwt.verify(token, KeyJwt());
  if (!decoded) {
    res.status(405).json({
      error: 405,
      message: 'Token is invalid'
    });
  }
  try {
    await AddClient.findByIdAndDelete(req.body.id);
    res.status(200).json({
      message: {
        title: 'Delete client',
        text: 'you have successfully deleted a client'
      }
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
