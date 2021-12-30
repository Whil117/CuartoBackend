import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { KeyJwt } from '../../environments/key_jwt';
import { Sale } from '../../types/routers/listsales/types';

const NewSale = require('../../models/newsale/newsale');
const router = express.Router();
dotenv.config();

router.post('/listsales', async (req: Request, res: Response) => {
  const token: string | any = req.headers['token'];
  const id: string = req.body.id;
  if (!id) {
    res.status(401).json({
      error: 'your not has provide a id',
      message: 'your not has provide a id'
    });
  }
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  const verifyToken = jwt.verify(token, KeyJwt());
  if (!verifyToken) {
    res.status(405).json({
      error: 405,
      message: 'Token is invalid'
    });
  }
  try {
    const salesUser = await NewSale.find({ author: id });
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
module.exports = router;
