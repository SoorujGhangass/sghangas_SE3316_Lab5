// app/models/collections.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require("bcryptjs");
var config = require("../../config/database");

//Schema defined with fields
var CollectionSchema   = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required:true
    },
    isPrivate: {
        type: Boolean,
        required:true,
        default:true
    },
    images: {
        type: [{href: String}]
    },
//Should only be able to rate PUBLIC image collections. If the user changes the visibility to PRIVATE, we won't delete the contents of this property in case they change it back to PUBLIC later.
//Instead, when displaying the top collections, we will have to sort by overallRating, but then also only choose to display the PUBLIC collections.
    ratings: {
        type: [{userID: String, rating: Number}]
    },
    overallRating: {
        type: Number,
        default:0
    },
//This will be used to ensure that the owner cannot rate their own Collection. It will also be used when checking if the logged in user has the authority to edit the Collection in any way (add, update, or delete).
    ownerID: {
        type:String,
        require:true
    }
});
//exporting model
var Collection = module.exports = mongoose.model('Collection', CollectionSchema);

//Functions for the model

module.exports.getCollectionById = function(id,callback){
    Collection.findById(id,callback);
}

module.exports.getTopCollections = function(number, callback){
    
}


module.exports.getCollectionsByUser = function(userID, callback){
    var query = {ownerID:userID};
    Collection.find(query).exec(callback);
}