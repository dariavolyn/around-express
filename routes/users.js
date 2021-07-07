const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const { getUsers, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);

router.get('/:id', (req, res) => {
  const usersPath = path.join(__dirname, '../data/users.json');

  fs.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      const info = JSON.parse(data);
      const user = info.filter((item) => item._id === req.params.id);
      if (user.length === 0) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.send(user);
      }
    })
    .catch(() => res.status(500));
});

module.exports = router;
