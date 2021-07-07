const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => { res.send(data); })
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.createUser = (req, res) => {
  const { name, about } = req.body;

  return User.create({ name, about })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};
