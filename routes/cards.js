const express = require('express');
const isURL = require('validator/lib/isURL');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  getCards, createCard, deleteCard, addLike, dislikeCard,
} = require('../controllers/cards');

function validateUrl(string) {
  return isURL(string);
}
router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), addLike);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
}), createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), dislikeCard);

router.get('/', getCards);

module.exports = router;
