const express = require('express');
const routes = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const {
  validateUserSignup,
  validateUserSignin,
} = require('../middlewares/validateUser');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

routes.use(express.json());

routes.post('/signup', validateUserSignup, createUser);

routes.post('/signin', validateUserSignin, login);

routes.use(auth);

routes.use('/users', userRouter);
routes.use('/movies', movieRouter);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

exports.routes = routes;
