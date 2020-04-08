const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Cat = require('../../models/Cat');

exports.logIn = async (req, res, next) => {
  const { facebookId, name } = req.body;
  const cats = await Cat.find({});
  let user = await User.findOne({ facebookId });
  user = user || await new User({ facebookId, name }).save();
  const token = jwt.sign({ facebookId, name }, process.env.JWT_KEY, { 
    expiresIn: '3d' 
  });
  res.json({ 
    message: 'ok', 
    user: {
      facebookId,
      name,
      cats: user.cats,
      mongoId: user.id,
    },
    cats,
    token,
  });
};
