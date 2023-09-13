// Import Module
const mongoose = require('mongoose');

// Create User Schema
const userSchema = mongoose.Schema({
    username: {type:String},
    password: { type: String },
    fullname: {type : String},
    status: { type : Boolean},
    subject :{ type : Array}
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);