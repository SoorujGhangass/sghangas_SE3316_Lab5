// server.js

// BASE SETUP
// =============================================================================
//NEW Dependencies
var path = require ('path');
var cors = require ('cors');
var passport = require('passport');
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');



//Setting up Database
var mongoose   = require('mongoose');
var config = require ('./config/database');
mongoose.Promise = global.Promise;
mongoose.connect(config.database,{ useMongoClient: true }); // connect to our database

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database'+config.database);
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname,'../client/angular-client')));

//var port = process.env.PORT || 8080;        // set our port
var port = 8081;

var api = require('./routes/api');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', api);

// START THE SERVER
// =============================================================================
app.listen(port, ()=>{
    console.log('Magic happens on port ' + port);
});
