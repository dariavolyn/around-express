const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash,
    }))
    .then(() => {
      res.send({ data: email });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Invalid data');
        err.statusCode = 400;
        next(err);
      } else if (e.name === 'MongoError' || e.code === 11000) {
        const err = new Error('Email already in use');
        err.statusCode = 409;
        next(err);
      } else {
        const err = new Error('Error');
        err.statusCode = 500;
        next(err);
      }
    });
};

module.exports.getProfile = (req, res, next) => {
  User.find({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User ID not found');
      } return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('Invalid data');
        err.statusCode = 400;
        next(err);
      } else {
        const err = new Error('Error');
        err.statusCode = 500;
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => { res.send(data); })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('Invalid data');
        err.statusCode = 400;
        next(err);
      } else {
        const err = new Error('Error');
        err.statusCode = 500;
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  console.log(JWT_SECRET);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      const err = new Error('Invalid email or password');
      err.statusCode = 401;
      next(err);
    });
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('Invalid data');
        err.statusCode = 400;
        next(err);
      } else {
        const err = new Error('Error');
        err.statusCode = 500;
        next(err);
      }
    });
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('Invalid data');
        err.statusCode = 400;
        next(err);
      } else {
        const err = new Error('Error');
        err.statusCode = 500;
        next(err);
      }
    });
};
