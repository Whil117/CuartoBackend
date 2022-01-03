import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { KeyJwt } from '../../environments/key_jwt';

const NewSale = require('../../models/newsale/newsale');
const router = express.Router();
dotenv.config();

router.post('/addnewsale', async (req: Request, res: Response) => {
  if (!req.headers['token']) {
    res.status(401).json({
      message: {
        title: 'Authorization',
        text: 'You are not authorized to access this resource'
      }
    });
  }
  const token: string | string[] | any =
    req.headers['token'] && req.headers['token'];
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
    const addnewsale = await new NewSale({
      ...req.body
    });
    try {
      await addnewsale.save();
      res.status(200).json({
        message: {
          title: 'Success',
          text: 'Your sale has been saved'
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
