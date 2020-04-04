const express = require('express');
const catsController = require('./controller/cats.controller');
const router = express.Router();

/* GET home page. */
router.post('/', catsController.registerCat);

module.exports = router;
