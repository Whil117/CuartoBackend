import express from 'express'
import './connect/connect'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

const PORT = process.env.PORT || 8000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
dotenv.config()

const authentication = require('./auth/authenticaction')
app.use(authentication.registerUser)
app.use(authentication.loggerUser)

//routers
const addnewsale = require('./routers/addnewsale/addnewsale')
app.use(addnewsale)

app.get('/', (req, res) => res.send('Express + TypeScript Server'))
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
