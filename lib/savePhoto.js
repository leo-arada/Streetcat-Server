const User = require('../models/User');
const Cat = require('../models/Cat');

module.exports.savePhoto = async (data) => {
  const newCat = await new Cat(data).save();
  const user = await User.findById({ _id: newCat.founder });
  user.cats.push(newCat._id);
  await user.save();
  // const cats = await Cat.find({});
  return [newCat, user];
};
