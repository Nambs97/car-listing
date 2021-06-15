const express = require("express");
const router = express.Router();

// Load User model
const Car = require("../controllers/car.controller");

//GET : Retrieve all cars from Database
// @route GET api/cars
// @desc Retrieve cars
// @access Public
router.get('/cars', Car.findAll);


//POST : Register and Save New Car in Database
// @route POST api/cars/register
// @desc Register car
// @access Public
router.post('/cars/create', Car.create);

//PUT : Update and Save Car in Database
// @route PUT api/car/register
// @desc Update car
// @access Public
router.put('/cars/update/:id', Car.update);

//DELETE : Update Car
// @route DELETE api/cars/delete
// @desc Login user and return JWT token
// @access Public
router.delete('/cars/delete/:id', Car.delete);


module.exports = router;