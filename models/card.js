const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => {
        const regexp = /^([http://]|[https://])[www.]?[.~:/?%#[\]@!$&'()*+,;=\w]+#?$/gm;

        return v.test(regexp);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'likes',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.module('card', cardSchema);
