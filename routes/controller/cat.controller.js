const User = require('../../models/User');
const Cat = require('../../models/Cat');
const { savePhoto } = require('../../lib/savePhoto');
var AWS = require('aws-sdk');

const s3 = new AWS.S3({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

exports.registerCat = async (req, res, next) => {
  const { cat, id } = req.body;
  res.json({ result: 'ok' });
  const user = await User.findOne({ id });
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

exports.increaseLike = async (req, res, next) => {
  const { id, catId } = req.body;
  const cat = await Cat.findById({ _id: catId });
  const didUserLike = cat.likes.some((objId) => objId.toString() === id);
  if (didUserLike) return res.json({ message: 'User already liked it'});
  cat.likes.push(id);
  await cat.save();
  res.json({ result: 'ok', cat });
};

exports.saveCatData = async (req, res, next) => {
  const { 
    accessibility, 
    description,
    friendliness, 
    id, 
    latitude, 
    longitude, 
    name, 
    time 
  } = req.body;
  const type ='jpg';
  const buffer = req.files.image.data;
  
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `photos/${name}-${time}`,
    Body: buffer,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  const cat = {
    accessibility,
    description,
    founder: id,
    friendliness,
    name,
    time,
    location : [latitude, longitude]
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.log('error');
    }

    const image = data.Location;
    cat.image = image;
    const catAndUser = await savePhoto(cat);
    const [newCat, user] = catAndUser;
 
    res.json({ 
      message: 'ok', 
      user: {
        facebookId: user.facebookId,
        name: user.name,
        cats: user.cats,
        mongoId: user.id,
      },
      cat: newCat,
    });
  });
};

exports.updateCatdata = async (req, res, next) => {
  const { cat_id } = req.params;
  const cat = await Cat.findByIdAndUpdate({ _id:cat_id }, (req.body), { new: true });
  res.json({ 
    message: 'ok', 
    cat,
  });
};

exports.deleteCata = async (req, res, next) => {
  const { _id, founder } = req.body;
  const cat = await Cat.findByIdAndDelete({ _id });

  s3.deleteObject({
    Bucket: process.env.BUCKET_NAME,
    Key: `photos/${cat.name}-${cat.time}`,
  }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });

  const user = await User.findById({ _id: founder });
  const newCat = user.cats.filter((cat) => cat.toString() !== _id);
  await User.findByIdAndUpdate({ _id: founder }, { cats: newCat }, { new: true });
  res.json({ result: 'ok', cat });
};
