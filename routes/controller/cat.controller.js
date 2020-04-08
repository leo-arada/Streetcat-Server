const User = require('../../models/User');
const Cat = require('../../models/Cat');
const { savePhoto } = require('../../lib/savePhoto');
var AWS = require('aws-sdk');

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
  const s3 = new AWS.S3({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,
  });

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `photos/${id}-${time}`,
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
    const catsAndUser = await savePhoto(cat);
    const [cats, user] = catsAndUser;

    res.json({ 
      message: 'ok', 
      user: {
        facebookId: user.facebookId,
        name: user.name,
        cats: user.cats,
        mongoId: user.id,
      },
      cats,
    });
  });
};