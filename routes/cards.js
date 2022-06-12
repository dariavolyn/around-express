const express = require('express');
// const isURL = require('validator/lib/isURL');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  getCards, createCard, deleteCard, addLike, dislikeCard,
} = require('../controllers/cards');

// function validateUrl(string) {
//   if (isURL(string) === true) {
//     return string;
//   }
// }
// celebrate({
//   body: Joi.object().keys({
//     link: Joi.string().required(),
//     name: Joi.string().required(),
//   }),
// }),

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), addLike);

router.post('/', createCard);

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
