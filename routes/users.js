const express = require('express');
const isURL = require('validator/lib/isURL');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  getUsers, createUser, getProfile, patchUser, patchAvatar,
} = require('../controllers/users');

function validateUrl(string) {
  return isURL(string);
}

router.get('/', getUsers);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), getProfile);

router.post('/', celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(30),
    email: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), patchUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl),
  }),
}), patchAvatar);

module.exports = router;
