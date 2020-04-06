const express = require('express');
const catController = require('./controller/cat.controller');
const router = express.Router();
const { verifyToken } = require('./middlewares/authentication');

router.get('/', verifyToken, catController.getHandler)
router.post('/', catController.registerCat);

module.exports = router;
