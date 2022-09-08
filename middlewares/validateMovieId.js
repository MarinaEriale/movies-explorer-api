const { celebrate, Joi } = require('celebrate');

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = validateMovieId;
