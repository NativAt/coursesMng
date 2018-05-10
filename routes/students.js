const api = require('express').Router();
const studentController = require('../controllers/students');

api.get('/', studentController.getStudents);
api.post('/', studentController.createStudent);
api.patch('/:id', studentController.updateStudent);
api.delete('/:id', studentController.deleteStudent);


api.post('/:id/courses/:courseId', studentController.assignCourseToStudent);
api.patch('/:id/courses/:courseId', studentController.setScoreToStudentCourse);

// students with a weighted average of above 90.
api.get('/top', studentController.getTopStudents);

module.exports = api;