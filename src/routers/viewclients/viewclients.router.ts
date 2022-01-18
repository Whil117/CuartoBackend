import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { KeyJwt } from '../../environments/key_jwt';

const AddClient = require('../../models/addclient/addclient.model');
const router = express.Router();
dotenv.config();

router.get('/viewclient', async (req: Request, res: Response) => {
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

    try {
      const findClients = await AddClient.find({ author: decoded._id });
      const clients = findClients.map(
        (client: { _id: string; name: string; image: string }) => {
          return {
            id: client._id,
            name: client.name,
            image: client.image
          };
        }
      );
      return res.status(200).json({
        clients
      });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;