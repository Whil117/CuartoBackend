import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { KeyJwt } from '../../environments/key_jwt';
import { Sale } from '../../types/routers/listsales/types';

const NewSale = require('../../models/newsale/newsale');
const router = express.Router();
dotenv.config();

router.get('/listsales', async (req: Request, res: Response) => {
  const token: string | any = req.headers['token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  const verifyToken: { _id: string } | any = jwt.verify(token, KeyJwt());
  if (!verifyToken) {
    res.status(405).json({
      error: 405,
      message: 'Token is invalid'
    });
  }
  try {
    const salesUser = await NewSale.find({ author: verifyToken._id });
    const listSales = salesUser.map((sale: Sale) => {
      return {
        id: sale._id,
        title: sale.title,
        address: sale.address
      };
    });

    res.status(200).json({
      listSales
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
});

router.post('/listsales/item', async (req: Request, res: Response) => {
  const token: string | any = req.headers['token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  const verifyToken: { _id: string } | any = jwt.verify(token, KeyJwt());
  if (!verifyToken) {
    res.status(405).json({
      error: 405,
      message: 'Token is invalid'
    });
  }
  try {
    await NewSale.findByIdAndDelete(req.body.id);
    res.status(200).json({
      message: {
        title: 'Delete Sale',
        text: 'you have successfully deleted a sale'
      }
    });
  } catch (error) {}
});
module.exports = router;
