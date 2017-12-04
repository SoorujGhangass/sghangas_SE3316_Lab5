//Source: https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
const HOST_NAME = "se3316-sooruj.c9users.io/confirmation?token=";
const SITE_EMAIL = 'sooruj.se3316@gmail.com';
const SITE_EMAIL_PASS = 'heatley333';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require("bcryptjs");
var config = require("../../config/database");
//Install These
var crypto = require('crypto');
var nodemailer = require('nodemailer');

const TokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});


var Token = module.exports = mongoose.model('Token', TokenSchema);


module.exports.sendToken = function(user,callback){
    
    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    
    // Save the verification token
    token.save(function (err) {
        if (err) throw err;
        // Send the email
        var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: SITE_EMAIL, pass: SITE_EMAIL_PASS } });
        var mailOptions = { from: 'sooruj.se3316@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttps:\/\/' + HOST_NAME + token.token + '.\n' };
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
            callback(null, user);
        });
    });        
    
}