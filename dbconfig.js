//var mysql = require('serverless-mysql')()
require("dotenv").config();
const mysql = require('serverless-mysql')()
mysql.config({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    timeout: 10000
})


mysql.connect((err) => {
    i
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed");
    }
});

module.exports = mysql;