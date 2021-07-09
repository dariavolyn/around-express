const express = require('express');

const router = express.Router();

const {
  getUsers, createUser, getProfile, patchUser, patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getProfile);
router.post('/', createUser);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
