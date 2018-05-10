const MongoClient = require('mongodb').MongoClient;
const { connectionString } = require('../config');

const mongoose = require('mongoose');
mongoose.connect(`${connectionString}/university`);

const db = require('../model');

exports.getStudents = ({ courseId, age, name, avg }) => {
    let query = {};
    if (courseId) Object.assign(query, { "courses.id": courseId });
    if (age) Object.assign(query, { age });
    if (name) Object.assign(query, { name });
   

    try {
        return db.students.find(query);
    } catch (err) {
        return err;
    }
};

exports.createStudent = async (name, age) => {
    try {
        const student = db.students;
        const newStudent =  new student({ "name": name, "age": age });
        return newStudent.save();
    } catch (err) {
        return err;
    }
},

exports.updateStudent = async (id, { name, age }) => {
    try {
        return db.students.findByIdAndUpdate(id, { $set: {name, age} }, {new: true});
    } catch (err) {
        return err;
    }
},

exports.deleteStudent = async (id) => {
    try {
        return db.students.findByIdAndRemove(id);
    } catch (err) {
        return err;
    }
};

exports.assignCourseToStudent = async (id, courseId) => {
    try {
        return db.students.findByIdAndUpdate(id, { $push: {courses: { id: courseId } } }, {new: true});
    } catch (err) {
        return err;
    }
};

exports.setScoreToStudentCourse = async (id, courseId, score) => {
    try {
        return db.students.update({ _id: id, "courses.id": courseId }, { $set: {"courses.$.score": score } }, {new: true})
    } catch (err) {
        return err;
    }
};


exports.getTopStudents = async () => {
    try {
        return db.students.aggregate([{ $unwind: "$courses" }, { $group: { _id: "$_id", avgAge: {  $avg : "$courses.score" } } }, { $match: { avgAge: { $gt: 90 } } }, { $sort : { avgAge: 1 } }]);
    } catch (err) {
        return err;
    }
};