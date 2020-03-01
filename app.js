// load our app server using express somehow....const express = require('express')
import express from 'express';
const app = express();
import morgan from 'morgan';
import mysql from 'mysql';
import path from 'path';
import bodyParser from 'body-parser';
import connection from './database/db';
import cookieParser from 'cookie-parser';
import session from 'express-session';

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./public'));
app.use(express.static(__dirname + '../public'));
app.use(morgan('short'));

app.set('view engine','pug');
app.set('views','./public');
app.use(cookieParser());
app.use(session({
  secret: 'secret cat',
  resave: false,
  saveUninitialized:false,
  cookie:{
    maxAge :360000 //1 hour
  }
}));

import router from './routes/user.js';

app.use(router);



app.get('/',function(req,res){
  res.render('load2');
});

const port = 3009;
// localhost:3003
app.listen(port, () => {
  console.log(`Server is up and listening on '${port}'...`)
})


