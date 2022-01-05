import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { KeyJwt } from '../../environments/key_jwt';
import { favoriteProps } from '../../types/routers/favorites/types';

const NewSale = require('../../models/newsale/newsale');
const router = express.Router();
dotenv.config();

router.put('/favoritesale', async (req: Request, res: Response) => {
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
    const favoritesale = await NewSale.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { favorite: req.body.favorite } },
      { useFindAndModify: false }
    );
    try {
      await favoritesale.save();
      if (req.body.favorite) {
        res.status(200).json({
          message: {
            title: 'Favorite',
            text: 'you have linked this one of your favorites'
          }
        });
      } else {
        res.status(200).json({
          message: {
            title: 'Favorite',
            text: 'you have unlinked this one out of your favorites'
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

router.get('/favoritesale', async (req: Request, res: Response) => {
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
    const decoded: { _id: string } | any = jwt.verify(token, KeyJwt());
    if (!decoded) {
      res.status(401).json({
        message: {
          title: 'Token',
          text: 'Token is invalid'
        }
      });
    }
    const favoritesale = await NewSale.find({
      favorite: true,
      author: decoded._id
    });
    const favorites = favoritesale.map((favorite: favoriteProps) => {
      return {
        id: favorite._id,
        title: favorite.title,
        address: favorite.address
      };
    });
    try {
      res.status(200).json({
        favorites
      });
    } catch (error) {
      console.log(error);
    }
  }
});
module.exports = router;
