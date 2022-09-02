const express = require('express');
const movieRouter = require('express').Router();

const validateMovie = require('../middlewares/validateMovie');
const validateMovieId = require('../middlewares/validateMovieId');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/movies', getMovies);

movieRouter.post('/movies', express.json(), validateMovie, createMovie);

movieRouter.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
