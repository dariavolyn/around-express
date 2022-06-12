const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  getUsers, createUser, getProfile, patchUser, patchAvatar,
} = require('../controllers/users');

router.get('/users/me', getUsers);

router.get('/:id', getProfile);

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

router.patch('/me/avatar', patchAvatar);

module.exports = router;
