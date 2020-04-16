const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.verifyToken = async (req, res, next) => {
  try {
    
    let token = req.headers['authorization'];
    console.log('token in auth', new Date().toISOString())
    token = token.startsWith('Bearer') ? token.slice(7, token.length) : null;
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    console.log('error', new Date().toISOString())
    next(createError(401));
  }
};
