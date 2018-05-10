const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const studentsRoute = require('./routes/students');
const coursesRoute = require('./routes/courses');

app.use('/api/v1/students', studentsRoute);
app.use('/api/v1/courses', coursesRoute);

app.listen(8080, () => console.log('listening on port 8080!'))