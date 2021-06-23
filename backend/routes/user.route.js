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

//GET : Retrieve all users from Database
// @route GET api/users
// @desc Retrieve users
// @access Public
router.get('/users', User.findAll);

//GET : Retrieve one users by ID from Database
// @route GET api/users/:id
// @desc Retrieve users
// @access Public
router.get('/users/:id', User.findOne);


module.exports = router;