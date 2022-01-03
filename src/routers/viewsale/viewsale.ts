import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { KeyJwt } from '../../environments/key_jwt';

const NewSale = require('../../models/newsale/newsale');
const registerUser = require('../../models/register/register');
const router = express.Router();
dotenv.config();

router.post('/preview', async (req: Request, res: Response) => {
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
    const decoded: any = jwt.verify(token, KeyJwt());
    if (!decoded) {
      res.status(401).json({
        message: {
          title: 'Token',
          text: 'Token is invalid'
        }
      });
    }

    const user = await registerUser.findOne(
      { _id: decoded._id },
      {
        password: 0
      }
    );
    const sale = await NewSale.findOne(
      {
        _id: req.body.id,
        author: user._id
      },
      {
        author: 0
      }
    );
    if (!sale) {
      res.status(404).json({
        message: {
          title: 'Sale',
          text: 'Sale not found'
        }
      });
    }
    res.status(200).json({
      sale,
      author: user
    });
  }
});
module.exports = router;
