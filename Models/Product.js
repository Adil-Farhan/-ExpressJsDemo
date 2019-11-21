const mongo = require('mongoose');

const ProductSchema = mongo.Schema({
    name: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongo.model('Products', ProductSchema) //any name or name use in database