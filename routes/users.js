const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', (req, res) => {
  const usersPath = path.join(__dirname, '../data/users.json')

  fs.readFile(usersPath, { encoding: 'utf8' })
    .then(data =>
      res.status(200).send(data),
    );

})
router.get('/:id', (req, res) => {
  const usersPath = path.join(__dirname, '../data/users.json')

  fs.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      const user = JSON.parse(data).find(user => user._id === req.params.id)
      if (!user) {
        res.status(404).send({ message: "User ID not found" })
      }
      res.send(user)
    })

})
module.exports = router;