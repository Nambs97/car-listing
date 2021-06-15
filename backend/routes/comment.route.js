const express = require("express");
const router = express.Router();

// Load User model
const Comment = require("../controllers/comment.controller");

//GET : Retrieve all comments from Database
// @route GET api/comments
// @desc Retrieve comments
// @access Public
router.get('/comments', Comment.findAll);

//GET : Retrieve all comments for a specified post from Database
// @route GET api/comments/:carid
// @desc Retrieve comments
// @access Public
router.get('/comments/:carid', Comment.findAll);


//POST : Register and Save New Car in Database
// @route POST api/comments/register
// @desc Post comments
// @access Public
router.post('/comments/post', Comment.postComment);

//PUT : Update and Save Comment in Database
// @route PUT api/comments/register
// @desc Update car
// @access Public
router.put('/comments/update/:id', Comment.update);

//DELETE : Delete Comment
// @route DELETE api/comments/delete
// @access Public
router.delete('/comments/delete/:id', Comment.delete);


module.exports = router;