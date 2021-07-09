const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => { res.send(data); })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'Bad Request') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      } return res.status(500).send({ message: 'Error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'Bad Request') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      } return res.status(500).send({ message: 'Error' });
    });
};

module.exports.getProfile = (req, res) => {
  User.find({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User ID not found' });
      } return res.send(user);
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'Bad Request') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      } return res.status(500).send({ message: 'Error' });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'Bad Request') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      } return res.status(500).send({ message: 'Error' });
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'Bad Request') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      } return res.status(500).send({ message: 'Error' });
    });
};
