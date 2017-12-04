//Source: https://www.youtube.com/watch?v=6pdFXmTfkeE&t=4s

var express = require('express');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require('../config/database')
//Importing Collection Data Schema
var Collection= require('../app/models/collection'); //Using the CollectionSchema in /app/models/collection.js
var User = require("../app/models/user");
var Token = require('../app/models/token')


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

router.route('/user')

    // create a collection (accessed at POST http://localhost:8081/api/collection)
    .post(function(req, res) {

        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: req.body.hashedPassword,
            emailVerified: req.body.emailVerified
        });      // create a new instance of the Collection model
        
        User.addUser(newUser,(err,user)=>{
           if(err){
               res.json({success:false,msg:"Failed to register user"});
           } else{
               Token.newToken(user,(err,user)=>{
                   if(err)throw err;
                    res.json({success:true,msg:"User registered. Click on the link sent to your email."});  
               });
           }
        });
    })
    
    .get(function(req, res) {
        Collection.find(function(err, collection) {
            if (err)
                res.send(err);

            res.json(collection);
        });
    });
    
router.route('/user/confirmation')

    // create a collection (accessed at POST http://localhost:8081/api/collection)
    .post(function(req, res) {

        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: req.body.hashedPassword,
            emailVerified: req.body.emailVerified
        });      // create a new instance of the Collection model
        
        User.addUser(newUser,(err,user)=>{
           if(err){
               res.json({success:false,msg:"Failed to register user"});
           } else{
               Token.newToken(user,(err,user)=>{
                   if(err)throw err;
                    res.json({success:true,msg:"User registered. Click on the link sent to your email."});  
               });
           }
        });
    })

router.route('/user/resend')

    // create a collection (accessed at POST http://localhost:8081/api/collection)
    .post(function(req, res) {

        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: req.body.hashedPassword,
            emailVerified: req.body.emailVerified
        });      // create a new instance of the Collection model
        
        User.addUser(newUser,(err,user)=>{
           if(err){
               res.json({success:false,msg:"Failed to register user"});
           } else{
               Token.newToken(user,(err,user)=>{
                   if(err)throw err;
                    res.json({success:true,msg:"User registered. Click on the link sent to your email."});  
               });
           }
        });
    })    
    
    
router.route('/user/authenticate')

    // create a collection (accessed at POST http://localhost:8081/api/collection)
    .post(function(req, res) {
        
        var email = req.body.email;
        var password = req.body.hashedPassword;
        
        User.getUserByEmail(email, (err,user)=>{
            if(err)throw err;
            if(!user){
                return res.json({success:false,msg:'User not found'});
            }
            
            User.comparePassword(password,user.hashedPassword,(err,isMatch)=>{
                if(err)throw err;
            
                if(isMatch){
                    if(!user.emailVerified){
                        return res.json({success:false,msg:'Email is not verified.'})
                    }else{
                        var token = jwt.sign({data:user},config.secret,{
                            expiresIn: 3600 //1 hour
                        });
                        
                        return res.json({
                            success:true,
                            token:'JWT '+token,
                            user:{
                                id:user._id,
                                name:user.name,
                                email:user.email
                            }
                        });
                    }
                }else{
                    return res.json({success:false,msg:'Wrong password'});
                }
            });
        });

    });

router.route('/user/profile')

    .get(passport.authenticate('jwt',{session:false}),function(req,res){
        res.json({user:req.user});
    });
    
module.exports = router;