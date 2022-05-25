const Card = require('../models/card');

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const err = new Error('Card not found');
        err.statusCode = 404;
        next(err);
      } res.send({ data: card });
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

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const createdAt = Date.now();

  Card.create({
    name, link, owner, createdAt,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
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

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove({ _id: req.params.id })
    .then((card) => {
      if (card) {
        if (req.user._id === card.owner._id.toString()) {
          res.send({ data: card });
        } else {
          const err = new Error('Invalid data');
          err.statusCode = 403;
          next(err);
        }
      } else {
        const err = new Error('Invalid data');
        err.statusCode = 404;
        next(err);
      }
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

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const err = new Error('Card not found');
        err.statusCode = 404;
        next(err);
      } res.send({ data: card });
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

module.exports.getCards = (req, res, next) => {
  Card.find({})
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
