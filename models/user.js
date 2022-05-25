const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => {
        const regexp = /^((http:\/\/)|(https:\/\/))(www\.)?[.-_~:/?%#[\]@!$&'()*+,;=\w]+\.[\w]#?/gm;
        return regexp.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    })
    .catch((e, next) => {
      if (e.name === 'ValidationError') {
        const err = new Error(e.message);
        err.statusCode = 400;
        next(err);
      } else {
        const err = new Error(e.message);
        err.statusCode = 500;
        next(err);
      }
    });
};

module.exports = mongoose.model('user', userSchema);
