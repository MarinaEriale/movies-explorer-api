require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
// const crypto = require('crypto');
const cors = require('cors');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/errorHandler');

const { routes } = require('./routes/index');

const { NODE_ENV, MONGO_LINK } = process.env;

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

mongoose.connect(NODE_ENV === 'production' ? MONGO_LINK : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
