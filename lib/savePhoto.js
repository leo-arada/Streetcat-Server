const User = require('../models/User');
const Cat = require('../models/Cat');

module.exports.savePhoto = async (data) => {
  const cat = await new Cat(data).save();
  const user = await User.findById({ _id: cat.founder });
  user.cats.push(cat._id);
  await user.save();
  const cats = await Cat.find({});
  return [cats, user];
};
