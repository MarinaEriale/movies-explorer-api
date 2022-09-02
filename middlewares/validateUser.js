const { celebrate, Joi } = require('celebrate');

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = validateUser;
