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

//controllers

//routers
const addnewsale = require('./routers/addnewsale/addnewsale');
const listsales = require('./routers/listsales/listsales');
const viewsale = require('./routers/viewsale/viewsale');
const profile = require('../src/controlls/profile/profile');
const favoritesales = require('./routers/favoritessales/favoritessales');
const addclient = require('./routers/addclient/addclient.router');
const viewclient = require('./routers/viewclients/viewclients.router');
const deletclient = require('./routers/deleteClient/deleteclient.router');

app.use('/dashboard', favoritesales);
app.use('/dashboard', profile);
app.use('/dashboard', addnewsale);
app.use('/dashboard', listsales);
app.use('/dashboard', viewsale);
///PEOPLE ADDONS
app.use('/dashboard', addclient);
app.use('/dashboard', viewclient);
app.use('/dashboard', deletclient);

app.get('/', (req, res) =>
  res.json({
    message: 'Welcome to the dashboard'
  })
);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
