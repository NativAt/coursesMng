const MongoClient = require('mongodb').MongoClient;
const { connectionString } = require('./config');

// connect to the db
MongoClient.connect(connectionString, function(err, database) {
    if(!err) {
        const db = database.db('university')
        console.log("We are connected");

        exports.getStudents = async () => {
            try {
                const collection = db.collection('students');
                const result = await collection.find({}, {_id: 0, name: 1, age: 1}).toArray();
                return result;
            } catch (err) {
                return err;
            }
        },

        exports.createStudent = async (name, age) => {
            try {
                const collection = db.collection('students');
                const newStudentDoc =  { "name": name, "age": age };
                const result = await collection.insert(newStudentDoc);
                return result;
            } catch (err) {
                return err;
            }
        },

        exports.updateStudent = async (id, name, age) => {
            try {
                const collection = db.collection('students');
                const result = await collection.update({ _id: id }, { $set: { name, age }});
                return result;
            } catch (err) {
                return err;
            }
        },

        exports.deleteStudent = async (id) => {
            try {
                const collection = db.collection('students');
                const result = await collection.deleteOne({ id: id });
                return result;
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

    } else {
        console.log(`DB error: ${err}`);
    }
});
