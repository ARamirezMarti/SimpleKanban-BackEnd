const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const Mongoose = require('mongoose');

const morgan = require('morgan');

const path = require('path');
const fs = require('fs')
const logDirPath = path.join(__dirname, 'logs');
const logFilePath = path.join(__dirname, 'logs','access.log')


if(fs.existsSync(logDirPath)){
  app.use(morgan('common', {
    stream: fs.createWriteStream(logFilePath, {flags:'a'})
  }));
  
}else if(!fs.existsSync(logDirPath)){
  fs.mkdirSync(logDirPath)
  app.use(morgan('common', {
    stream: fs.createWriteStream(logFilePath, {flags:'xw'})
  }));
}


require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
 

// eslint-disable-next-line import/no-dynamic-require
app.use('/api', require(path.join(__dirname, './src/routes/routes')));

const mongoseDeprecations = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

Mongoose.connect(process.env.MONGODB, mongoseDeprecations, (err) => {
  if (err) {
    console.log('Can not connect to the Database');
  }
  console.log('Database connected');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
