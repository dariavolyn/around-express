const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', (req, res) => {
  const cardsPath = path.join(__dirname, '../data/cards.json');

  fs.readFile(cardsPath, { encoding: 'utf-8' })
    .then(data => {
      res.status(200).send(data)
  })
})

module.exports = router;