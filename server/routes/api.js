var express = require('express');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//Importing Collection Data Schema
var Collection= require('../app/models/collection'); //Using the CollectionSchema in /app/models/collection.js

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8081/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/collection')

    // create a collection (accessed at POST http://localhost:8081/api/collection)
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

    // get the collection with that id (accessed at GET http://localhost:8081/api/collection/:collection_id)
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

module.exports = router;