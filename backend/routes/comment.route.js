const express = require("express");
const router = express.Router();

// Load User model
const Comment = require("../controllers/comment.controller");

//GET : Retrieve all comments from Database (with or without condition as query string "user" or/and "car")
// @route GET api/comments
// @desc Retrieve comments
// @access Public
router.get('/comments', Comment.findAll);

//GET : Retrieve all comments for a specified post from Database
// @route GET api/comments/:carid
// @desc Retrieve comments
// @access Public
router.get('/comments/:id', Comment.findOne);


//POST : Register and Save New Comment in Database
// @route POST api/comments/register
// @desc Post comments
// @access Public
router.post('/comments', Comment.postComment);

//PUT : Update and Save Comment in Database
// @route PUT api/comments/register
// @desc Update car
// @access Public
router.put('/comments/:id', Comment.update);

//DELETE : Delete a Comment
// @route DELETE api/comments/delete/:id
// @access Public
router.delete('/comments/:id', Comment.delete);

//DELETE : Delete all Comments
// @route DELETE api/comments/delete
// @access Public
router.delete('/comments/:id', Comment.deleteAll);


module.exports = router;