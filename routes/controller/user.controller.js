const User = require('../../models/User');
const Cat = require('../../models/Cat');

exports.sendMyCatData = async (req, res, next) => {
  const  { id } = req.params;
  const user = await User.findById(id).populate('cats');
  res.json({ result: 'ok', cats: user.cats});
};

exports.sendLikedCatData = async (req, res, next) => {
  const  { id } = req.params;
  const cats = await Cat.find({ likes : { $in : [id] }});
  res.json({ result: 'ok', cats: cats});
};
