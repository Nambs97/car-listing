const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const User = db.users;
const secretOrKey = process.env.SECRETORKEY;

// Load input validation
const validateRegisterInput = require("../validations/register.validation");
const validateLoginInput = require("../validations/login.validation");


// Register and Save a new User
exports.register = (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ username: req.body.username }).then( user => {
        if (user) {
            return res.status(400).json({ email: "Username already exists" });
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.json(user);
                            console.log("User successfully registered : " + user);
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
};

// Login User
exports.login = (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const username = req.body.username;
    const password = req.body.password;
    
    // Find user by username
    User.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ usernamenotfound: "Username not found" });
        }
        
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.username
            };
            
            // Sign token
            jwt.sign(
                payload,
                secretOrKey,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                    success: true,
                    token: "Bearer " + token
                    });
                    console.log("User logged in sucessfully : " + user.username);
                }
            );
        } else {
            console.log("User login failed : Password incorrect");
            return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
        });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    const psid = req.query.psid;
    var condition = psid ? { customer_id: { $regex: new RegExp(psid), $options: "i" } } : {};

    Order.find(condition)
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

// Find a single Orders with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Order with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving Tutorial with id=" + id });
        });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;

    Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else res.send({ message: "Order was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Order.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
        });
    } else {
        res.send({
            message: "Order was deleted successfully!"
        });
    }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Order with id=" + id
        });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Order.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Orders were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all orders."
        });
    });
};
