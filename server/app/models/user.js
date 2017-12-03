// app/models/users.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require("bcryptjs");
var config = require("../../config/database");

var UserSchema   = new Schema({
    name: {
        type:String
    },
    email: {
        type:String,
        required: true
    },
    hashedPassword: {
        type:String,
        required: true
    },
    emailVerified: {
        type:Boolean,
        required: true,
        default: false
    },
});

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
    User.findOne(query, callback);
}


module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err,salt)=>{
        if (err) throw err;
        bcrypt.hash(newUser.hashedPassword, salt, (err,hash)=>{
            if(err) throw err;
            newUser.hashedPassword = hash;
            newUser.save(callback);
        });
    });
}