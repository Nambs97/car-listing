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
            console.log("404 Error : { usernamenotfound: \"Username not found\" }");
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

// Get a User by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving User with id=" + id });
        });
};


// Retrieve all Users or Some responding to condition from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

    User.find(condition)
    .then(data => {
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).send({ message: "Not found User with current filter" });
        }
        
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving users."
        });
    });
};
