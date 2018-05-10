const api = require('express').Router();
const coursesController = require('../controllers/courses');

api.get('/', coursesController.getCourses);
api.post('/', coursesController.createCourse)
api.patch('/:id', coursesController.updateCourse)
api.delete('/:id', coursesController.deleteCourse)

module.exports = api;