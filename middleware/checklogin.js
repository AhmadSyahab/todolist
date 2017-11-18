const mongoose = require('mongoose').connect('mongodb://localhost:27017/todolist');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const Task = require('../models/task');
require('dotenv').config()

function isSignIn(req,res,next) {
	jwt.verify(req.headers.token , process.env.SECRET_KEY , function(err, decoded) {
		if(err || req.params.userId != decoded.id){
			res.send({message : "not authorized"})
		}else{
			req.headers.id = decoded.id
			req.headers.username = decoded.username
			req.headers.email = decoded.email
			next()	
		}
	});

// invalid token - synchronous
}

module.exports ={
	isSignIn
}