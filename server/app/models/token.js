var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require("bcryptjs");
var config = require("../../config/database");
//Install These
var crypto = require('crypto');
var nodemailer = require('nodemailer');

const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});