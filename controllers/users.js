const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const IncorrectQueryError = require('../errors/incorrect-query-err');
const NotFoundError = require('../errors/not-found-err');
const AlreadyExistsError = require('../errors/already-exists-err');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.getMeEndpoint = (req, res, next) => {
  const userId = req.user._id;

  userModel
    .findById(userId)
    .then((user) => {
      if (user === null) {
        return next(new NotFoundError('Пользователь не был найден'));
      }
      return res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  userModel
    .findByIdAndUpdate(
      userId,
      { name: req.body.name, email: req.body.email },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true,
      },
    )
    .then((user) => {
      if (user === null) {
        return next(new NotFoundError('Пользователь не был найден'));
      }
      return res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectQueryError('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        return next(new AlreadyExistsError('Пользователь с такой почтой уже существует'));
      }
      return next(err);
    });
};

exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => userModel
      .create({
        name,
        email,
        password: hash,
      }) // создадим документ на основе пришедших данных
    // вернём записанные в базу данные
      .then((user) => res.send({
        name: user.name,
        _id: user._id,
        email: user.email,
      }))
    // данные не записались, вернём ошибку
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new IncorrectQueryError('Переданы некорректные данные'));
        }
        if (err.code === 11000) {
          return next(new AlreadyExistsError('Пользователь уже существует'));
        }
        return next(err);
      }));
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  userModel.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'very-strong-secret',
        { expiresIn: '7d' },
      );

      // вернём токен
      res.status(200).send({ token });
    })
    .catch(next);
};
