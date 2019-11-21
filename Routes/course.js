const express = require('express');
const Course = require('../Models/Courses');

const router = express.Router();

const courses = [
    {
        id: 1,
        name: 'node'
    },
    {
        id: 2,
        name: 'express'
    },
    {
        id: 3,
        name: 'hapi'
    },
    {
        id: 4,
        name: 'sails'
    }];

router.get('/', (req, res) => {
    res.send(courses);
});



router.get('/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('Course not found with given Id')
    };

    res.send(course);
});


router.get('/:id/:name', (req, res) => {
    res.send(req.params);
});


router.post('/', (req, res) => {
    const courseTemp = new Course({
        name: req.body.name,
        price: req.body.price
    });

    courseTemp.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            message: err
        })
    res.send(courseTemp);

});
module.exports = router;