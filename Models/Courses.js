const mongo = require('mongoose');

const CourseSchema = mongo.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongo.model('Courses', CourseSchema) //any name or name use in database