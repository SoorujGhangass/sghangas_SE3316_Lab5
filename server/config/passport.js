//Source: https://www.youtube.com/watch?v=6pdFXmTfkeE&t=4s
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../app/models/user");
var config = require('../config/database');

module.exports = function(passport){
    let opts ={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        User.getUserById(jwt_payload.data._id,(err,user)=>{
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    }));
}
