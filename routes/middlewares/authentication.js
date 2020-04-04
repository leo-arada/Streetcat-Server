const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.verifyToken = async (req, res, next) => {
  console.log('token verify')
  let token = req.headers['authorization'];
  console.log(token, '111111');
  token = token.startsWith('Bearer') ? token.slice(7, token.length) : null;
  console.log(token, '222222')
  if (!token) {
    return res.status(401).json({ error: 'unauthorized'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {

  }
};
