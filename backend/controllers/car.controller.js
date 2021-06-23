const db = require("../config/db.config");
const Car = db.cars;

// Load input validation
const validateCarInput = require("../validations/car.validation");


// Register and Save a new Car
exports.create = (req, res) => {
    // Form validation
    const { errors, isValid } = validateCarInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Car.findOne({ title: req.body.title }).then( car => {
        if (car) {
            return res.status(400).json({ email: "Car title already exists" });
        } else {
            const newCar = new Car({
                title: req.body.title,
                description: req.body.description
            });
            
            newCar
                .save()
                .then(car => {
                    res.json(car);
                    console.log("Car successfully added to listing : " + car);
                })
                .catch(err => console.log(err));
        }
    });
};


// Retrieve all Cars or Some responding to condition from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    var condition = {};
    if (title && !description) {
        condition = { title: { $regex: new RegExp(title), $options: "i" } }
    } else if (!title && description) {
        condition = { description: { $regex: new RegExp(description), $options: "i" } }
    } else if (title && description) {
        condition = { 
            title: { $regex: new RegExp(title), $options: "i" },
            description: { $regex: new RegExp(description), $options: "i" }
        }
    }

    Car.find(condition)
    .then(data => {
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).send({ message: "Not found Car with current filter" });
        }
        
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving cars."
        });
    });
};

// Find a single Cars with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Car.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Car with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
            .status(500)
            .send({ message: "Error retrieving Car with id=" + id });
        });
};

// Update a Car by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;

    Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Car with id=${id}. Maybe Car was not found!`
            });
        } else res.send({ message: "Car was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Car with id=" + id
        });
    });
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Car.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
        });
    } else {
        res.send({
            message: "Car was deleted successfully from listing!"
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
    Car.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Cars were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all cars."
        });
    });
};
