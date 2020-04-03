const express = require('express');
const authController = require('./controller/auth.controller');
const router = express.Router();

/* GET home page. */
router.post('/login', authController.logIn);

module.exports = router;
