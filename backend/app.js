const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(cors());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

app.get('/api/courses', (req, res) => {
    res.send(courses);

});

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('the couse with the given ID is not found');
    res.send(course);

});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('the couse with the given ID is not found');
        return;
    }

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    //Update course
    course.name = req.body.name;
    res.send(course);
    //Return the updated course
});

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('the couse with the given ID is not found');

    //Deletee
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(course, schema);
}

app.listen(port, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})
