const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => {
        const regexp = /^[http://]|[https://][www.]?[.~:/?%#[\]@!$&'()*+,;=\w]+#?$/gm;
        return regexp.test(v);
      },
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
