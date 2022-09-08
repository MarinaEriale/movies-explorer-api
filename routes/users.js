const express = require('express');
const userRouter = require('express').Router();
const {
  updateProfile,
  getMeEndpoint,
} = require('../controllers/users');

const validateUpdatedUser = require('../middlewares/validateUpdatedData');

userRouter.get('/me', getMeEndpoint);

userRouter.patch('/me', express.json(), validateUpdatedUser, updateProfile);

module.exports = userRouter;
