const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;

const StudentCourseSchema = new Schema({
    id:    { type: String },
    score: { type: Number },
}, { _id : false });

const StudentSchema = new Schema({
    _id:     { type: ObjectIdSchema, auto: true },
    name:    { type: String },
    age:     { type: Number },
    courses: [ StudentCourseSchema ] ,
}, { versionKey: false });

const CoursesSchema = new Schema({
    _id:            { type: ObjectIdSchema, auto: true },
    name:           { type: String },
    creditScores:   { type: Number },
}, { versionKey: false });


module.exports.students = mongoose.model("Students", StudentSchema, "students");
module.exports.courses = mongoose.model("Courses", CoursesSchema, "courses");