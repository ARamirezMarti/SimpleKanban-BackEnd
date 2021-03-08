const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
app.use(cors());

const Mongoose = require('mongoose');

const port = 5555;
const morgan = require('morgan');

const path = require('path');
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
    console.log('no se a podido conectar con base de datos');
  }
  console.log('Base de datos conectada');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
