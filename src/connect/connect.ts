import mongoose, { ConnectionOptions } from 'mongoose'
import dotenv from 'dotenv'
import db_connection from '../environments/db_connection'
dotenv.config()

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
}

mongoose.connect(db_connection(), dbOptions)

const connection = mongoose.connection

connection.once('open', () => console.log('connected to mongodb'))

connection.on('warning', (e: any) => console.warn(e.stack))
