const db = require('../db/courses');

const getCourses = async (req, res) => {
    const courses = await db.getCourses();
    res.json(courses);
}

const createCourse = async (req, res) => {
    try {
        if (!req.body.name || !req.body.creditScores) 
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
        const students = await db.deleteCourse(req.params.id);

        if (!students) return res.status(400).send('Course can not be deleted.');

        return res.status(200).end();
    } catch (err) {
        return res.status(500).send('Internal server error' + err);
    }
}

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}