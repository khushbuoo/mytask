const express = require('express');

const router = express.Router();

const {
    register,
    login,
    getUser,
} = require('../../controller/userController');


// User
router.post('/register', register);
router.post('/login', login);
router.get('/getProfile',getUser);



module.exports = router;

