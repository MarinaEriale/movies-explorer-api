const { celebrate, Joi } = require('celebrate');

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)/),
    trailerLink: Joi.string().required().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)/),
    thumbnail: Joi.string().required().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = validateMovie;
