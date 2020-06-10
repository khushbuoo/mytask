const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../../common/utils/middleware/auth');

const users = require('./user');


router.use(isAuthenticated);


router.use('/auth', users);


module.exports = router;
