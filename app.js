require('dotenv').config();

const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb+srv://admin:adminPassword@cluster0.6hf5ju2.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.json());

app.use(cors());
app.options('*', cors());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Error'
        : message,
    });
  next();
});

app.listen(PORT);
