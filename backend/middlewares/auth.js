const jwt = require('jsonwebtoken');
const CustomError = require('../helpers/CustomError');

const { NODE_ENV, JWT_SECRET } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return false;
  }
}

function checkAuth(req, res, next) {
  const token = req.headers.authorization || req.cookies.jwt;
  const tokenPayload = checkToken(token);
  if (tokenPayload) {
    req.user = tokenPayload;
    return next();
  }
  return next(new CustomError('Доступ запрещен', 401));
}

module.exports = {
  generateToken, checkAuth, secretKey,
};
