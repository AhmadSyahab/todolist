const mongoose = require('mongoose').connect('mongodb://localhost:27017/todolist');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const Task = require('../models/task');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()

function signUp(req,res){
	let user = new User({
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		email : req.body.email,
		task  : [],
		createdAt : Date.now()})
	user.save((err,user) => {
		if(err){
			res.status(500).send({err : err.errmsg});
		}else{
			res.send(user);
		}
	})
}

function signIn(req,res){
	User.findOne({
		username : req.body.username
	},(err,user) => {  
		if (err){
			res.status(500).send({err : err.msg});
		}else
		bcrypt.compare(req.body.password, user.password, (err,result) => {
			if(result){
				jwt.sign({
					id : ObjectId(user._id),
					username : user.username,
					email : user.email
				}, process.env.SECRET_KEY , (err,token) => {
					res.send({ user, message : "login success", token : token})
				})
			}else{
				res.send({err, message : "wrong password"})
			}			
		})
	})
}

function findAll(req,res) {
	User.find({
		_id : ObjectId(req.headers.id)
	}).populate('task').exec()
	.then(allTask => {
		res.send(allTask);
	})
	.catch(err => {
		res.status(500).send({err: err.errmsg})
	})
}

function create(req,res) {
	User.findOne({
		_id : ObjectId(req.headers.id)
	}).then(user => {
		let task = new Task({
			userId : req.headers.id,
			taskname : req.body.taskname,
			tags : req.body.tags,
			status : false,
			createdAt : Date.now(),
			finishDate : null
		})
		task.save((err, task) => {
			if(err){
				res.status(500).send({err : err.errmsg})
			}else{
				user.task.push(task)
				user.save()
				res.send(user);
			}
		})
	})
}

module.exports = {
	signUp,
	signIn,
	create,
	findAll
}