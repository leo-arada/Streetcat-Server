const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.sendCatData = async (req, res, next) => {
  let token = req.headers['authorization'];
  token = token.startsWith('Bearer') ? token.slice(7, token.length) : null;
  if (!token) {
    return res.status(401).json({ error: 'unauthorized'});
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

  } catch (error) {

  }
};