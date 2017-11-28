// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var Collection= require('./app/models/collection'); //Using the CollectionSchema in /app/models/collection.js

var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/collection',{ useMongoClient: true }); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/collection')

    // create a collection (accessed at POST http://localhost:8080/api/collection)
    .post(function(req, res) {

        var collection = new Collection();      // create a new instance of the Collection model
        collection.name = req.body.name;  // set the collections name (comes from the request)

        // save the collection and check for errors
        collection.save(function(err) {
            if (err)
                res.send(err);

        });
        
        res.json({ message: 'Collection created!' });
    })
    
    .get(function(req, res) {
        Collection.find(function(err, collection) {
            if (err)
                res.send(err);

            res.json(collection);
        });
    });

router.route('/collection/:collection_id')

    // get the collection with that id (accessed at GET http://localhost:8080/api/collection/:collection_id)
    .get(function(req, res) {
        Collection.findById(req.params.collection_id, function(err, collection) {
            if (err)
                res.send(err);
            res.json(collection);
        });
    })
    
    .put(function(req, res) {

        // use our collection model to find the collection we want
        Collection.findById(req.params.collection_id, function(err, collection) {

            if (err)
                res.send(err);

            collection.name = req.body.name;  // update the collections info

            // save the collection
            collection.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Collection updated!' });
            });

        });
    })
    
    .delete(function(req, res) {
        Collection.remove({
            _id: req.params.collection_id
        }, function(err, collection) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);