// app/models/collections.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//Could also just use a Boolean variable to determine if the collection is public or private
const VISIBILITY_TYPES = ['PUBLIC','PRIVATE'];

var CollectionSchema   = new Schema({
    name: String,
    description: String,
    visibility: VISIBILITY_TYPES,
    images: [{imageID: String}],
//Should only be able to rate PUBLIC image collections. If the user changes the visibility to PRIVATE, we won't delete the contents of this property in case they change it back to PUBLIC later.
//Instead, when displaying the top collections, we will have to sort by overallRating, but then also only choose to display the PUBLIC collections.
    ratings: [{userID: String, rating: Number}], 
    overallRating: Number,
//This will be used to ensure that the owner cannot rate their own Collection. It will also be used when checking if the logged in user has the authority to edit the Collection in any way (add, update, or delete).
    ownerID: String
});

//Does this need to be in its own .js file with its own 'module.exports' call and then import call in the server.js file?
var UserSchema   = new Schema({
    email: String,
    hashedPassword: String,
    emailVerified: Boolean,
    images: [{imageID: String}],
    ratings: [{userID: String, rating: Number}] ,
//I store the overall rating rather than calculating it each time it is accessed based off the 'ratings' array, because in order to display the top 10 collections, it would require too much processing each
//time I want to access the page to do this calculation. The time and computation savings far outweighs the added space complexity, I think.
    overallRating: Number,
});

module.exports = mongoose.model('Collection', CollectionSchema);