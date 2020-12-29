const { response } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Import the URLs
const qrRouters = require('./routes/qr');
app.use('/qr', qrRouters);

//Routes
app.get('/', (req, res) => {
    res.json({ name: 'QR Generator by Althus TI', data: req.body });
});

//MongoDB Connect
mongoose.connect(
    process.env.DB_CONNECT, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => console.log('MongoDB connect.')
);

//Start the server in the port 3000
app.listen(process.env.PORT || 3000);