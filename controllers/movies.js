const movieModel = require('../models/movie');
const IncorrectQueryError = require('../errors/incorrect-query-err');
const NotFoundError = require('../errors/not-found-err');
const ErrorDefault = require('../errors/error-default');
const ForbiddenError = require('../errors/forbidden-err');

exports.getMovies = (req, res, next) => {
  movieModel
    .find({})
    .then((movie) => res.send({ data: movie }))
    .catch(() => next(new ErrorDefault('Ошибка сервера')));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  // получим из объекта данные фильма
  const ownerId = req.user._id;

  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    }) // создадим документ на основе пришедших данных
    // вернём записанные в базу данные
    .then((movie) => res.send({ data: movie }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectQueryError('Переданы некорректные данные'));
      }
      return next(new ErrorDefault('Ошибка сервера'));
    });
};

exports.deleteMovie = (req, res, next) => {
  movieModel
    .findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError('Карточка не была найдена'));
      } if (req.user._id !== String(movie.owner)) {
        return next(new ForbiddenError('Нет права на удаление карточки'));
      }
      return movie.remove()
        .then((deletedMovie) => {
          res.status(200).send({ data: deletedMovie });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new IncorrectQueryError('Передан не валидный id'));
          }
          return next(new ErrorDefault('Ошибка сервера'));
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectQueryError('Передан не валидный id'));
      }
      return next(new ErrorDefault('Ошибка сервера'));
    });
};
