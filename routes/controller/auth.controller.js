const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.logIn = async (req, res, next) => {
  const { facebookId, name } = req.body;
  let user = await User.findOne({ facebookId });
  user = user || await new User({ facebookId, name }).save();
  // console.log(user)
  // console.log(22222)
  const token = jwt.sign({ facebookId, name }, process.env.JWT_KEY, { expiresIn: '3d' });
  res.json({ 
    message: 'ok', 
    user: {
      facebookId,
      name,
      cats: user.cats,
      mongoId: user.id,
    },
    token });
};
