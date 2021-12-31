import express from 'express';
import './connect/connect';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();

//authentication
const authentication = require('./auth/authenticaction');
app.use(authentication.registerUser);
app.use(authentication.loggerUser);
app.use(authentication.verifyUser);

//routers
const addnewsale = require('./routers/addnewsale/addnewsale');
const listsales = require('./routers/listsales/listsales');
app.use('/dashboard', addnewsale);
app.use('/dashboard', listsales);

app.get('/', (req, res) =>
  res.json({
    message: 'Welcome to the dashboard'
  })
);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
