const createError = require('http-errors');
const User = require('../../models/User');
const Cat = require('../../models/Cat');
const jwt = require('jsonwebtoken');

exports.logIn = async (req, res, next) => {
  try {
    const { facebookId, name } = req.body;
    console.log(facebookId, name, 'facebook info', new Date().toISOString())
    const cats = await Cat.find({});
    // console.log(cats, 'cat info', new Date().toISOString())
    let user = await User.findOne({ facebookId });
    
    user = user || await new User({ facebookId, name }).save();
    console.log(user, 'user info', new Date().toISOString())
    const token = jwt.sign({ facebookId, name }, process.env.JWT_KEY, { 
      expiresIn: '3d' 
    });
    console.log(token, 'token', new Date().toISOString())
    res.json({ 
      result: 'ok', 
      user: {
        facebookId,
        name,
        cats: user.cats,
        mongoId: user.id,
      },
      cats,
      accessToken: token,
    });
  } catch (error) {
    next(createError(500));
  }
};
