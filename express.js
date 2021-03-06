import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import signupRoute from './routes/signup';
import auth from './routes/auth';
import update from './routes/update';
import lostpassword from './routes/lostpassword';
require('dotenv').config();


import path from 'path'
/* import cookieParser from 'cookie-parser'
import compress from 'compression'
import helmet from 'helmet'
import Template from './../template'
import authRoute from './routes/auth'; */

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'build/index.html'));  });
}
else{
  app.use(express.static("public"));
}

//routes
app.use('/', signupRoute);
app.use('/', auth);
app.use('/', update);
app.use('/', lostpassword);


export default app;