const User = require('../../models/User');
const Cat = require('../../models/Cat');

exports.registerCat = async (req, res, next) => {
  const { cat, id } = req.body;
  res.json({ result: 'ok' });
  const user = await User.findOne({ facebookId: id });
  const newCat = await new Cat({
    ...cat,
    founder: user._id,
  }).save();
  await user.cats.push(newCat._id)
  user.save();
};

exports.getHandler = (req, res, next) => {
  res.json({ result: 'loggedIn'});
};

exports.uploadAndSaveImages = async (req, res, next) => {
};