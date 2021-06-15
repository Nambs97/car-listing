const db = require("../config/db.config");
const Comment = db.comment;

// Load input validation
const validateCommentInput = require("../validations/comment.validation");


// Register and Save a new Comment
exports.postComment = (req, res) => {
    // Form validation
    const { errors, isValid } = validateCommentInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const newComment = new Comment({
        user_id: req.body.user_id,
        car_id: req.body.car_id,
        content: req.body.content
    });
    
    newComment
        .save()
        .then(comment => {
            res.json(comment);
            console.log("Comment successfully posted to the post : " + comment);
        })
        .catch(err => console.log(err));
};


// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
    const car_id = req.params.carid;
    var condition = car_id ? { car_id: { $regex: new RegExp(car_id), $options: "i" } } : {};

    Comment.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving orders."
        });
    });
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Comment with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving Comment with id=" + id });
        });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;

    Comment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Comment with id=${id}. Maybe Comment was not found!`
            });
        } else res.send({ message: "Comment was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Comment with id=" + id
        });
    });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
        });
    } else {
        res.send({
            message: "Comment was deleted successfully from the post!"
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Comment with id=" + id
        });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Comment.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Comments were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all comments."
        });
    });
};
