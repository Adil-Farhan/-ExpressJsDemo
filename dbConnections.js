require('dotenv/config')

// const url = 'mongodb://localhost:27017/Store';
const mongoClient = require('mongoose');

var MyDbHandler = null;
//Database Configuration
mongoClient.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err, db) => {
        if (!err) {
            console.log('Database connected successfully')
            // var collection = db.collection('Product');

        }
        else {
            console.log(err)
        }

    });


