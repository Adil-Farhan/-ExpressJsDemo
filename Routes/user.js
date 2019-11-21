

const express = require('express');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const verify = require('../Routes/verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); //accepts a file
    }
    else {
        cb(null, true); //rejects a file
    }
};
const uploadFolder = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const { registerValidation, loginValidation } = require('../validation');

require('dotenv/config');

router.post("/upload", uploadFolder.single('productImage'), (req, res) => {

    console.log(req.file);
    res.send('File Uploaded Successfully')
});

router.post('/login', async (req, res) => {

    //model validations
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //validate password
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send('User not found with this email');
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(404).send('Password in incorrect ' + req.body.password + ' ' + user.password + ' ' + validPass);

    //asssign web token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    //return response
    res.header('auth-token', token).send(token);

});

router.post('/register', async (req, res) => {

    //Model Validations
    const { error } = registerValidation(req.body);
    // res.send(validation.error.details[0].message);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    //check if user already exist in database
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
        return res.status(400).send('User already exist with this email');
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Model Assignment
    const user = new User({
        name: req.body.name,
        password: hashedPass,
        email: req.body.email
    });


    //Model To database
    const savedUser = await user
        .save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ message: err });
        });

});

//adding auth and making it private
router.get('/', verify, async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);

    }
    catch (err) {
        res.json({ message: err })
    }
});

router.post('/', (req, res) => {

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });


    const savedUser = user
        .save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ message: err });
        });

});


router.get('/:userId', async (req, res) => {
    // res.json(req.params.userId);
    try {
        const user = await User.findById(req.params.userId);
        if (user) {
            res.json(user);
        }
        res.json("user not found");

    }
    catch (err) {
        res.json({
            message: err
        })
    }
});

router.delete('/:userId', async (req, res) => {
    // res.json(req.params.userId);
    try {
        const removedUser = await User.remove({
            _id: req.params.userId
        })
        res.json({ message: 'User with Id: ' + removedUser._id + " has been removed" })
    }
    catch (err) {
        res.json({
            message: err
        })
    }
});



module.exports = router;