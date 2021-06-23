const express = require("express");
const router = express.Router();

// Load User model
const Car = require("../controllers/car.controller");

//GET : Retrieve all cars from Database
// @route GET api/cars
// @desc Retrieve cars
// @access Public
router.get('/cars', Car.findAll);

//GET : Retrieve one cars by ID from Database
// @route GET api/cars/:id
// @desc Retrieve cars
// @access Public
router.get('/cars/:id', Car.findOne);


//POST : Register and Save New Car in Database
// @route POST api/cars/register
// @desc Register car
// @access Public
router.post('/cars', Car.create);

//PUT : Update and Save Car in Database
// @route PUT api/car/register
// @desc Update car
// @access Public
router.put('/cars/:id', Car.update);

//DELETE : Delete a Car by Id
// @route DELETE api/cars/delete/:id
// @access Public
router.delete('/cars/:id', Car.delete);

//DELETE : Delete All Cars
// @route DELETE api/cars/delete
// @access Public
router.delete('/cars', Car.deleteAll);


module.exports = router;