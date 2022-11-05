const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');

const authInst = new AuthController();

router.post('/login', authInst.login);
router.post('/logout', authInst.logout);

module.exports = router;
