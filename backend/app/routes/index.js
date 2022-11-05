const express = require('express');
require('express-async-errors');

const router = express.Router();
const errorhandler = require('../errorhandler/error');

const authRouter = require('./auth');
const userRouter = require('./user');

router.use('/auth', authRouter);
router.use('/user', userRouter);

router.use(errorhandler);

module.exports = router;
