const app = require('express')();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
const morgan = require('morgan')
 

const url = 'mongodb://localhost:27017/library';
// const User = require('./routers/user')
const User = require('./routers/user')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', User)

app.listen(3000)