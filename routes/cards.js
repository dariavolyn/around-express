const express = require('express');

const router = express.Router();

const {
  getCards, createCard, deleteCard, addLike, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', deleteCard);
router.post('/', createCard);
router.put('/:id/likes', addLike);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
