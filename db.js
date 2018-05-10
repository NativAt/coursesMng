const MongoClient = require('mongodb').MongoClient;
const { connectionString } = require('./config');

const mongoose = require('mongoose');
mongoose.connect(`${connectionString}/university`);

const db = require('./model');

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
},

exports.getCourses = async () => {
    try {
        const collection = db.collection('courses');
        const result = await collection.find({}, {_id: 0, name: 1, age: 1}).toArray();
        return result;
    } catch (err) {
        return err;
    }
},

exports.createCourse = async (name, creditScores) => {
    try {
        const collection = db.collection('courses');
        const newCourseDoc =  { "name": name, "creditScores": creditScores };
        const result = await collection.insert(newCourseDoc);
        return result;
    } catch (err) {
        return err;
    }
},

exports.updateCourse = async (id, name, creditScores) => {
    try {
        const collection = db.collection('courses');
        const result = await collection.update({ _id: id }, { $set: { name, creditScores }});
        return result;
    } catch (err) {
        return err;
    }
},

exports.deleteCourse = async (id) => {
    try {
        const collection = db.collection('courses');
        const result = await collection.deleteOne({ id: id });
        return result;
    } catch (err) {
        return err;
    }
}