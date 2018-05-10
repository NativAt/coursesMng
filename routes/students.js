const api = require('express').Router();
const studentController = require('../controllers/students');

api.get('/', studentController.getStudents);
api.post('/', studentController.createStudent)
api.patch('/:id', studentController.updateStudent)
api.delete('/:id', studentController.deleteStudent)


api.patch('/:id/courses/:courseId', studentController.assignCourseToStudent)
module.exports = api;