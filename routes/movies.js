const express = require('express');
const movieRouter = require('express').Router();

const validateMovie = require('../middlewares/validateMovie');
const validateMovieId = require('../middlewares/validateMovieId');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('', getMovies);

movieRouter.post('', express.json(), validateMovie, createMovie);

movieRouter.delete('/:_id', validateMovieId, deleteMovie);

module.exports = movieRouter;
