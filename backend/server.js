const express = require('express');
const passport = require("passport");
require('dotenv').config();

//Set up Express App
const app = express();

app.use(express.json());

//Error handling middleware
app.use(function(err, req, res, next) {
    res.status(422).send({error: err.message});
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport.config")(passport);

const PORT = process.env.PORT || 4000;

//Connection to the Mongo Database
const db = require("./config/db.config");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database !");
  })
  .catch(err => {
    console.log("Cannot connect to the database !", err);
    process.exit();
  });


//Initialize routes
app.use('/api', require('./routes/user.route'));
app.use('/api', require('./routes/car.route'));
app.use('/api', require('./routes/comment.route'));

app.listen(PORT, function(){
    console.log('Server starts on port ' + PORT);
})