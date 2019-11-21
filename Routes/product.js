


const express = require('express');
const Product = require('../Models/Product')
const router = express.Router();
var mongoose = require('mongoose');
require('dotenv/config')



// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);

    }
    catch (err) {
        res.json({ message: err })
    }
});

router.post('/', (req, res) => {

    const product = new Product({
        name: req.body.name,
        code: req.body.code
    });


    const savedProduct = product
        .save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ message: err });
        });

});


module.exports = router;