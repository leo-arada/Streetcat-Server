const express = require('express');
const catController = require('./controller/cat.controller');
const router = express.Router();
const { verifyToken } = require('./middlewares/authentication');

router.get('/', verifyToken, catController.getHandler);
router.post('/', catController.registerCat);
router.post('/:cat_id/like', verifyToken, catController.increaseLike);
router.post('/uploadImages', verifyToken, catController.saveCatData);
router.put('/:cat_id', verifyToken, catController.updateCatdata);
router.delete('/:cat_id', verifyToken, catController.deleteCata);

module.exports = router;
