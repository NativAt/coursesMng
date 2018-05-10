const MongoClient = require('mongodb').MongoClient;
const { connectionString } = require('../config');

const mongoose = require('mongoose');
mongoose.connect(`${connectionString}/university`);

const db = require('../model');

exports.getStudents = () => {
    try {
        return db.students.find();
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
