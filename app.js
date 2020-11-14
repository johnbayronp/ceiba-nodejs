'use strict'
var express = require('express');
var app = express();
const PORT = process.env.PORT || 8084;

var bodyParser = require('body-parser');

var rutas = require('./routes/routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,  Authorization");
    res.header("Access-Control-Request-Headers", "Origin, X-Requested-With, Content-Type, Accept,  Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    next();
});

//Routes
app.use('/api',rutas);

module.exports =  {app,PORT} ;