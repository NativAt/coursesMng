const api = require('express').Router();
const studentController = require('../controllers/students');

api.get('/', studentController.getStudents);
api.post('/', studentController.createStudent);
api.patch('/:id', studentController.updateStudent);
api.delete('/:id', studentController.deleteStudent);


api.post('/:id/courses/:courseId', studentController.assignCourseToStudent);
api.patch('/:id/courses/:courseId', studentController.setScoreToStudentCourse);

module.exports = api;