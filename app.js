'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const ussdBuilder = require('./ussd-api');
// app.use(ussd)
app.use(ussdBuilder)

// Your login credentials
const shortCode = '3350'
const username = 'sandbox'
const apikey = '3473c31f0342eef4325ddb5650d66463b76a0fded7d2e59681ad9132a2121634'

const options = {apiKey: apikey, username: username }
const africasTalking = require('africastalking')(options);


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});