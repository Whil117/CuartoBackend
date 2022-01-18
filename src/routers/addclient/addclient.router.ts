import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { KeyJwt } from '../../environments/key_jwt';

const AddClient = require('../../models/addclient/addclient.model');
const router = express.Router();
dotenv.config();

router.post('/addclient', async (req: Request, res: Response) => {
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
  if (token) {
    const decoded = jwt.verify(token, KeyJwt());
    if (!decoded) {
      res.status(401).json({
        message: {
          title: 'Token',
          text: 'Token is invalid'
        }
      });
    }
    const addclient = await new AddClient({
      ...req.body
    });
    try {
      await addclient.save();
      res.status(200).json({
        message: {
          title: 'Success',
          text: 'Your client has been saved'
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
