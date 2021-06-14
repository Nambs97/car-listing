const express = require("express");
const router = express.Router();

// Load User model
const User = require("../controllers/user.controller");

//POST : Register and Save New User in Database
// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/users/register', User.register);

//POST : Login User
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/users/login', User.login);


module.exports = router;