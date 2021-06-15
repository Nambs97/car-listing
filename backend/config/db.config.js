const mongoose = require("mongoose");
const dbConfig = {
    url: "mongodb+srv://car-listing:car-listing@lcdp-gs.dkryx.mongodb.net/car-listing?retryWrites=true&w=majority"
};

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("../models/user.model")(mongoose);
db.cars = require("../models/car.model")(mongoose);
db.comment = require("../models/comment.model")(mongoose);

module.exports = db;