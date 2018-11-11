'use strict';

const express = require('express');
const path = require('path');
const volleyball = require('volleyball');

const app = express();

// logging middleware
// app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api')); // include our routes!

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
    console.log('CATCHING ERRORS IN ROUTER - 500');
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.use((req, res, next) => {
    console.log('CATCHING ERRORS IN ROUTER - 404');
    const err = new Error('404 route not found!');
    err.status = 404;
    next(err);
});

module.exports = app;
