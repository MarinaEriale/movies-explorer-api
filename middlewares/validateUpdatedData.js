const { celebrate, Joi } = require('celebrate');

const validateUpdatedUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdatedAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)/),
  }),
});

module.exports = {
  validateUpdatedUser,
  validateUpdatedAvatar,
};
