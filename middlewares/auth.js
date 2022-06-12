const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Authorization required 1');
    err.statusCode = 401;
    next(err);
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'dev-secret');
    } catch (e) {
      const err = new Error('Authorization required 2');
      err.statusCode = 401;
      next(err);
    }
    req.user = payload;

    next();
  }
};
