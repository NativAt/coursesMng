const MongoClient = require('mongodb').MongoClient;
const { connectionString } = require('../config');

const mongoose = require('mongoose');
mongoose.connect(`${connectionString}/university`);

const db = require('../model');


exports.getCourses = () => {
    try {
        return db.courses.find();
    } catch (err) {
        return err;
    }
};

exports.createCourse = async (name, creditScores) => {
    try {
        const course = db.courses;
        const newCourse =  new course({ "name": name, "creditScores": creditScores });
        return newCourse.save();
    } catch (err) {
        return err;
    }
},

exports.updateCourse = async (id, name, creditScores) => {
    try {
        return db.courses.findByIdAndUpdate(id, { $set: {name, creditScores} }, {new: true});
    } catch (err) {
        return err;
    }
},

exports.deleteCourse = async (id) => {
    try {
        const students = db.students.find({ "courses.id": id });

        if (students) return null;
        return db.courses.findByIdAndRemove(id);
    } catch (err) {
        return err;
    }
};