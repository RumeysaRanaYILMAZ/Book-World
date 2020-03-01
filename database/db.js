/*Author:  Rumeysa Rana YILMAZ ,Sila ERYILMAZ*/
const mysql = require('mysql2');
const express = require('express');


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'user_management'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected to db!');
});

module.exports = connection.promise();