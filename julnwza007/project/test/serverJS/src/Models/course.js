// Import Module
const mongoose = require('mongoose');

// Create Course Schema
const courseSchema = mongoose.Schema({
    SubjectID: String,
    SubjectNameTH: String,
    SubjectNameEN: String,
    CourseYear: String,
    status: Boolean,
    time_start:{
        day:{ type : String},
        start:{ type : Number},
        finish:{ type : Number}
    }
}, { timestamps: true });

module.exports = mongoose.model('courses', courseSchema);