import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
// import { KeyJwt } from '../../../environments/key_jwt'
import dotenv from 'dotenv'
import { KeyJwt } from '../../environments/key_jwt'

const NewSale = require('../../models/newsale/newsale')
const router = express.Router()
dotenv.config()

router.post('/addnewsale', async (req: Request, res: Response) => {
  if (!req.headers['token']) {
    res.status(401).json({
      error: 'your not authorized',
      message: 'your not authorized',
    })
  }
  const token: string | string[] | any =
    req.headers['token'] && req.headers['token']
  if (token) {
    const decoded = jwt.verify(token, KeyJwt())
    if (!decoded) {
      res.status(401).json({
        error: 'your not authorized',
        message: 'your not authorized',
      })
    }
    const addnewsale = await new NewSale({
      ...req.body,
    })
    const isNewsaleExist: Boolean = await NewSale.findOne({
      title: addnewsale.title,
    })
    if (isNewsaleExist) {
      return res.status(405).json({
        authentication: false,
        type: 'addnewsale',
        message: 'Error: newsale registred',
      })
    }
    try {
      await addnewsale.save()
      res.status(200).json({
        message: 'newsale saved',
      })
    } catch (error) {
      console.log(error)
    }
  }
})

module.exports = router
