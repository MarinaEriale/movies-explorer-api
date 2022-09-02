require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
// const crypto = require('crypto');
const cors = require('cors');
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const validateUser = require('./middlewares/validateUser');

const userRoutes = require('./routes/users'); // импортируем роутер
const movieRoutes = require('./routes/movies');
const NotFoundError = require('./errors/not-found-err');

// const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(requestLogger);

app.post('/signup', validateUser, createUser);

app.post('/signin', validateUser, login);

app.use(auth);

app.use('/', userRoutes);

app.use('/', movieRoutes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});

app.listen(PORT);
