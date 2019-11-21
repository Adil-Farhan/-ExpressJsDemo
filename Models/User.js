const mongo = require('mongoose');

const UserSchema = mongo.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        require: true
    }

});


module.exports = mongo.model('Users', UserSchema) //any name or name use in database