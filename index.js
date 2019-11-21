const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const databaseComms = require('./dbConnections.js')

require('dotenv/config');


app.use(express.json());
app.use(bodyParser.json());



//import routess
const productRoutes = require('./Routes/product');
const courseRoutes = require('./Routes/course');
const userRoutes = require('./Routes/user');


//MIDDLEWares

app.use('/api/courses', courseRoutes);
app.use('/api/Product', productRoutes);
app.use('/api/user', userRoutes);


//ROUTES

app.get('/', (req, res) => {
    res.send('Hellow Wick');
});





//PORT AND LISTENING 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));