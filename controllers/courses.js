const db = require('../db');

const getCourses = async (req, res) => {
    const courses = await db.getCourses();
    res.json(courses);
}

const createCourse = async (req, res) => {
    try {
        if (!req.body.name && !req.body.creditScores) 
            return res.status(400).send('Required fields are missing!');
        const students = await db.createCourse(req.body.name, req.body.creditScores);
        return res.json(students);
    } catch(err) {
        return res.status(500).send('Internal server error');
    }   
}

const updateCourse = async (req, res) => {
    try {
        if (!req.params.id && (!req.body.name || !req.body.creditScores)) 
            return res.status(400).send('Required fields are missing!');
        const students = await db.updateCourse(req.params.id, req.body.name, req.body.creditScores);
        return res.json(students);
    } catch(err) {
        return res.status(500).send('Internal server error');
    }   
}

const deleteCourse = async (req, res) => {
    try {
        if (!req.params.id) 
            return res.status(400).send('Required fields are missing!');
        const students = await db.deleteStudent(req.params.id);
        return res.staus(200).end();
    } catch (err) {
        return res.status(500).send('Internal server error');
    }
}

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}